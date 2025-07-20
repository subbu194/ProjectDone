# 🚀 Local Development Setup Guide

## Why It Wasn't Working Locally

The issue was that Create React App (CRA) doesn't support serverless API routes by default. The API routes only work when deployed to Vercel.

## ✅ Solution: Local Express Server + Environment Switching

I've set up a local Express server that mirrors the Vercel serverless functions, plus an environment switching system.

## 📋 Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create a `.env.local` file in your project root:
```env
# Email Configuration
EMAIL_USER=yourprodone@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=yourprodone@gmail.com

# Calendly Integration (optional)
CALENDLY_WEBHOOK_SECRET=your_calendly_webhook_secret

# Server Configuration
PORT=3002
```

### 3. Set Up Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this password in EMAIL_PASS (not your regular Gmail password)

### 4. Configure Environment

#### For Local Development:
```bash
npm run setup:local
```

#### For Production/Vercel:
```bash
npm run setup:production
```

### 5. Start Development Servers

#### Option A: Start Both Servers (Recommended)
```bash
npm run dev:full
```

#### Option B: Start Servers Separately
Terminal 1 (API Server):
```bash
npm run server
```

Terminal 2 (React App):
```bash
npm start
```

## 🎯 What This Does

- **API Server**: Runs on `http://localhost:3002`
- **React App**: Runs on `http://localhost:3000`
- **Proxy**: React app forwards API calls to the Express server
- **Email**: LeadMagnet form will send emails locally
- **Environment Switching**: Automatic configuration for local/production

## 🔧 Available Scripts

- `npm start` - Start React development server
- `npm run server` - Start Express API server
- `npm run dev:full` - Start both servers simultaneously
- `npm run build` - Build for production
- `npm run setup:local` - Configure for local development
- `npm run setup:production` - Configure for production/Vercel

## 🧪 Testing

1. Run setup: `npm run setup:local`
2. Start the servers: `npm run dev:full`
3. Open `http://localhost:3000`
4. Test the LeadMagnet form
5. Check console for API logs

## 🚀 Production Deployment

For Vercel deployment:
1. Run: `npm run setup:production`
2. Add environment variables in Vercel dashboard
3. Deploy!

## 🔍 Troubleshooting

### Email Not Sending
- Check Gmail app password
- Verify environment variables
- Check console for error messages

### API 404 Errors
- Ensure both servers are running
- Check proxy configuration
- Verify port 3002 is available

### Port Conflicts
- Change PORT in `.env.local`
- Update proxy in `package.json`
- Restart servers

### Environment Issues
- Run `npm run setup:local` for local development
- Run `npm run setup:production` for Vercel deployment

## 📞 Support

If you encounter issues:
1. Check console logs
2. Verify environment variables
3. Ensure Gmail app password is correct
4. Restart both servers
5. Run appropriate setup command

## 🌍 Environment Switching

### Local Development:
- Uses Express server on port 3002
- Proxy forwards API calls
- Full local development experience

### Production (Vercel):
- Uses Vercel serverless functions
- No proxy needed
- Optimized for production deployment 