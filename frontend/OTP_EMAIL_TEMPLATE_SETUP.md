# Create OTP Email Template

## Quick Setup:

1. **Go to EmailJS Dashboard:** https://dashboard.emailjs.com/admin/templates

2. **Click "Create New Template"**

3. **Template Settings:**
   - **Template Name:** `tokedex_otp`
   - **To Email:** `{{to_email}}`
   - **From Name:** `TokeDex Security`
   - **Reply To:** `{{reply_to}}`
   - **Subject:** `🔐 Your TokeDex Login OTP`

4. **Email Content (HTML):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #333; font-size: 28px; margin: 0;">🔐 TokeDex</h1>
      <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">One-Time Password</p>
    </div>

    <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
      <p style="color: #666; font-size: 14px; margin: 0 0 15px 0;">Your OTP code is:</p>
      <div style="font-size: 48px; font-weight: bold; color: #7B61FF; letter-spacing: 8px; font-family: 'Courier New', monospace;">
        {{otp_code}}
      </div>
      <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">This code expires in 15 minutes</p>
    </div>

    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <p style="color: #856404; font-size: 14px; margin: 0;">
        <strong>⚠️ Security Warning:</strong> Never share this code with anyone. TokeDex will never ask for your OTP via email, phone, or any other method.
      </p>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">
        If you didn't request this code, please ignore this email or contact support immediately.
      </p>
      <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
        This is an automated message from {{website_name}}. Please do not reply to this email.
      </p>
    </div>

  </div>
</div>
```

5. **Click "Save"**

6. **Copy the Template ID** (looks like `template_abc123`)

7. **Update emailService.ts:**
   - Open `frontend/src/services/emailService.ts`
   - Find line 84: `'template_otp'`
   - Replace with your actual template ID: `'template_abc123'`

---

## How It Works:

### When user clicks "Continue with Email OTP":
1. User enters their email address
2. System generates random 6-digit OTP (e.g., `582916`)
3. Email is sent to user's inbox with the OTP
4. User checks email and enters the 6-digit code
5. System verifies the code matches
6. User is logged in! ✅

### Security Features:
- ✅ Random 6-digit OTP generated each time
- ✅ OTP only valid for that specific session
- ✅ User must enter correct code to login
- ✅ Email includes security warning
- ✅ Professional branded template

---

## Alternative: Use SMS OTP

If you prefer SMS instead of email, check the `OTP_SETUP_GUIDE.md` for Twilio, Firebase, or MSG91 integration.

---

## Testing:

1. Go to http://localhost:5175
2. Click "Connect Wallet" button
3. Click "Continue with Email OTP"
4. Enter your email: `cb.sc.u4cse23535@cb.students.amrita.edu`
5. Click "Send OTP"
6. **Check your email** for the 6-digit code
7. Enter the code in the modal
8. You'll be logged in!

**Note:** While you're setting up the template, the system will still work - it just won't send the email. Instead, check the browser console (F12) for the generated OTP code.
