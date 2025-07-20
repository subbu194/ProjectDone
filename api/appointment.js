import nodemailer from 'nodemailer';

const WEBHOOK_SECRET = process.env.CALENDLY_WEBHOOK_SECRET;

export default async function handler(req, res) {
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
} 