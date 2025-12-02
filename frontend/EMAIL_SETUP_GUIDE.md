# Email Notification Setup Guide for TokeDex

## Problem
Currently, when users sign in, they see a browser notification but **no email is sent** to their inbox. This is because email sending requires a backend service.

## Solution Options

### Option 1: EmailJS (Recommended for Frontend-Only)
**Easiest option - No backend required!**

#### Setup Steps:

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for free (200 emails/month)
   - Verify your email

2. **Setup Email Service**
   - Go to "Email Services" tab
   - Click "Add New Service"
   - Choose Gmail, Outlook, or any email provider
   - Follow OAuth connection steps
   - Note your **Service ID** (e.g., `service_abc123`)

3. **Create Email Template**
   - Go to "Email Templates" tab
   - Click "Create New Template"
   - Template Name: `signin_notification`
   - Template Content:
   ```
   Subject: Sign-in to TokeDex
   
   Hello {{user_name}},
   
   You have successfully signed in to TokeDex at {{signin_time}}.
   
   Email: {{user_email}}
   IP Address: {{ip_address}}
   Device: {{device_info}}
   
   If this wasn't you, please secure your account immediately.
   
   Best regards,
   TokeDex Team
   ```
   - Note your **Template ID** (e.g., `template_xyz789`)

4. **Get Public Key**
   - Go to "Account" tab
   - Copy your **Public Key** (e.g., `YOUR_PUBLIC_KEY`)

5. **Install EmailJS**
   ```bash
   npm install @emailjs/browser
   ```

6. **Environment Variables**
   Create `.env` file in frontend folder:
   ```
   VITE_EMAILJS_SERVICE_ID=service_abc123
   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
   VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
   ```

---

### Option 2: SendGrid (Production-Grade)
**Best for production with high volume**

#### Setup Steps:

1. **Create SendGrid Account**
   - Go to https://sendgrid.com/
   - Sign up (100 emails/day free)
   - Verify your email

2. **Create API Key**
   - Go to Settings > API Keys
   - Create API Key with "Mail Send" permission
   - Copy the API key

3. **Verify Sender Email**
   - Go to Settings > Sender Authentication
   - Verify your domain or single sender email

4. **Install SendGrid** (requires backend)
   ```bash
   npm install @sendgrid/mail
   ```

---

### Option 3: Resend (Modern Alternative)
**Developer-friendly, good for startups**

#### Setup Steps:

1. **Create Resend Account**
   - Go to https://resend.com/
   - Sign up (100 emails/day free)

2. **Get API Key**
   - Dashboard > API Keys
   - Create new API key
   - Copy the key

3. **Install Resend**
   ```bash
   npm install resend
   ```

---

## Quick Start with EmailJS (Recommended)

### 1. Install Package
```bash
cd frontend
npm install @emailjs/browser
```

### 2. Create Email Service File
Create `frontend/src/services/emailService.ts`

### 3. Update AuthModal
The code is already prepared - just uncomment the email sending lines and add your EmailJS credentials.

### 4. Test
- Sign in with your actual email (cb.sc.u4cse23535@cb.students.amrita.edu)
- Check your inbox (including spam folder)
- You should receive: "You have successfully signed in to TokeDex"

---

## Email Template Examples

### Sign-in Notification
```
Subject: ✓ Sign-in to TokeDex

Hello {name},

You successfully signed in to TokeDex.

Time: {time}
Email: {email}
Location: {location}

If this wasn't you, secure your account immediately.

TokeDex Team
```

### Sign-up Welcome
```
Subject: 🎉 Welcome to TokeDex!

Hello {name},

Welcome to TokeDex - Your Web3 Token Creation Platform!

Your account has been created successfully.

Get Started:
- Create your first token
- Explore token analytics
- Join our community

TokeDex Team
```

### OTP Verification
```
Subject: 🔐 Your TokeDex OTP Code

Hello,

Your OTP code is: {otp_code}

This code expires in 5 minutes.

Don't share this code with anyone.

TokeDex Team
```

---

## Security Best Practices

1. **Never expose API keys in frontend code**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Rate Limiting**
   - EmailJS: 200 emails/month free
   - SendGrid: 100 emails/day free
   - Add cooldown between emails (prevent spam)

3. **Email Validation**
   - Verify email format before sending
   - Check for disposable email addresses
   - Implement email verification links

4. **Content Security**
   - Sanitize user input in emails
   - Use templates to prevent injection
   - Include unsubscribe links for marketing emails

---

## Troubleshooting

### Emails Not Arriving
1. Check spam/junk folder
2. Verify sender email is authenticated
3. Check email service status
4. Review API key permissions
5. Check console for errors

### EmailJS Errors
- `Invalid template ID` - Check template ID in dashboard
- `Invalid public key` - Verify public key is correct
- `Service not found` - Check service ID
- `Template not found` - Ensure template is published

### Rate Limiting
- EmailJS: Max 200/month on free plan
- SendGrid: Max 100/day on free plan
- Solution: Upgrade plan or add cooldown logic

---

## Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| EmailJS | 200/month | $10/month (1000 emails) | Frontend-only apps |
| SendGrid | 100/day | $20/month (50k emails) | Production apps |
| Resend | 100/day | $20/month (50k emails) | Modern startups |
| AWS SES | 62k/month | $0.10/1000 emails | High volume |

---

## Next Steps

1. Choose email service (I recommend EmailJS for quick setup)
2. Create account and get credentials
3. Install npm package
4. Add environment variables
5. Uncomment email code in AuthModal
6. Test with your real email
7. Check inbox for notification

**Need help?** Let me know which option you want to use!
