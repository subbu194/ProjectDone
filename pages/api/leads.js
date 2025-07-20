import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
} 