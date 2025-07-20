const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/leads', async (req, res) => {
  const { industry, businessType, name, city, phone, email, message } = req.body;

  // Validate required fields
  if (!industry || !businessType || !name || !city || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if environment variables are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email configuration missing:', {
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS
    });
    return res.status(500).json({ 
      error: 'Email service not configured. Please contact support.' 
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `ProDone Website <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Lead Magnet Submission - ProDone',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
            🚀 New Lead Magnet Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City:</strong> ${city}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Business Information</h3>
            <p><strong>Industry:</strong> ${industry}</p>
            <p><strong>Business Type:</strong> ${businessType}</p>
          </div>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Project Description</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #2d5a2d;">
              <strong>Action Required:</strong> Please respond to this lead within 24 hours.
            </p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="text-align: center; color: #666; font-size: 12px;">
            This message was sent from the ProDone website contact form.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Lead email sent successfully:', { name, email, industry });
    res.json({ success: true, message: 'Email sent successfully' });
    
  } catch (err) {
    console.error('Lead email error:', err);
    
    // Provide more specific error messages
    if (err.code === 'EAUTH') {
      res.status(500).json({ 
        error: 'Email authentication failed. Please check email credentials.' 
      });
    } else if (err.code === 'ECONNECTION') {
      res.status(500).json({ 
        error: 'Email service connection failed. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to send email. Please try again or contact support.' 
      });
    }
  }
});

// Calendly webhook endpoint
app.post('/api/appointment', async (req, res) => {
  const WEBHOOK_SECRET = process.env.CALENDLY_WEBHOOK_SECRET;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Secure the webhook
    const token = req.headers['x-calendly-webhook-token'];
    if (!token || token !== WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === 'invitee.created') {
      if (!payload || !payload.invitee || !payload.event) {
        console.error('Malformed Calendly payload:', req.body);
        return res.status(400).json({ error: 'Malformed payload' });
      }

      const invitee = payload.invitee;
      const eventObj = payload.event;
      const fullName = invitee.name;
      const email = invitee.email;
      const dateTime = new Date(eventObj.start_time);
      let meetLink = '';

      if (eventObj.location && typeof eventObj.location === 'string' && eventObj.location.startsWith('https://meet.google.com')) {
        meetLink = eventObj.location;
      } else if (eventObj.conferencing && eventObj.conferencing.join_url) {
        meetLink = eventObj.conferencing.join_url;
      }

      if (!email) {
        console.error('No email found in invitee:', invitee);
        return res.status(400).json({ error: 'No email found in invitee' });
      }

      if (!meetLink) {
        console.warn('No Google Meet link found for event:', eventObj);
      }

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing EMAIL_USER or EMAIL_PASS in environment variables');
        return res.status(500).json({ error: 'Email configuration error' });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      try {
        await transporter.verify();
      } catch (verifyErr) {
        console.error('Nodemailer transporter verification failed:', verifyErr);
        return res.status(500).json({ error: 'Email transporter verification failed' });
      }

      const mailOptions = {
        from: `ProDone Team <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Your Meeting is Confirmed! 🎉`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #18181b; color: #fff; padding: 32px; border-radius: 18px; max-width: 480px; margin: 0 auto; box-shadow: 0 8px 32px 0 rgba(56,189,248,0.25);">
            <div style="text-align:center; margin-bottom: 24px;">
              <img src="https://i.imgur.com/1Q9Z1Zm.png" alt="ProDone Logo" style="width: 80px; margin-bottom: 12px; border-radius: 12px; box-shadow: 0 2px 8px #38bdf8;" />
              <h2 style="color: #38bdf8; font-size: 2rem; margin: 0;">Your Meeting is Confirmed!</h2>
            </div>
            <p style="font-size: 1.1rem;">Hi <b>${fullName}</b>,</p>
            <p style="margin-bottom: 18px;">Thank you for booking a meeting with us. Here are your meeting details:</p>
            <div style="background: #23232b; border-radius: 12px; padding: 18px 20px; margin-bottom: 18px;">
              <p style="margin: 0 0 8px 0;"><b>Date & Time:</b> ${dateTime.toLocaleString()}</p>
              <p style="margin: 0 0 8px 0;"><b>Meeting Link:</b></p>
              <a href="${meetLink}" style="display:inline-block; background: linear-gradient(90deg, #38bdf8 0%, #2563eb 100%); color: #fff; font-weight: bold; padding: 14px 32px; border-radius: 12px; box-shadow: 0 4px 16px #38bdf8; text-decoration: none; font-size: 1.1rem; margin-top: 8px; margin-bottom: 8px; transition: transform 0.2s;">Join Google Meet</a>
            </div>
            <p style="margin-bottom: 0.5rem;">You will receive a reminder 30 minutes before the meeting.</p>
            <p style="margin-bottom: 0.5rem;">If you have any questions, just reply to this email.</p>
            <div style="margin-top: 32px; text-align: center;">
              <span style="color: #38bdf8; font-weight: bold; font-size: 1.1rem;">Best regards,<br>ProDone Team</span>
            </div>
          </div>
        `
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response || info);
        return res.status(200).json({ success: true, emailSent: true });
      } catch (mailErr) {
        console.error('Error sending email:', mailErr);
        return res.status(500).json({ error: 'Failed to send email' });
      }
    }

    if (event === 'invitee.canceled') {
      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Calendly Webhook Error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ProDone API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 ProDone API Server running on port ${PORT}`);
  console.log(`📧 Email config: ${process.env.EMAIL_USER ? '✅ Configured' : '❌ Missing'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
}); 