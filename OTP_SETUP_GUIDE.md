# TokeDEx OTP Integration Guide

## Backend API Setup for OTP Authentication

To make the OTP feature work, you need to set up backend endpoints. Here's how to integrate with popular OTP services:

### Option 1: Using Twilio (Recommended)

1. **Install Twilio SDK:**
```bash
npm install twilio
```

2. **Create API endpoints (`/api/auth/send-otp` and `/api/auth/verify-otp`):**

```javascript
// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Store OTPs temporarily (use Redis in production)
const otpStore = new Map();

// Generate random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiry (5 minutes)
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your TokeDEx verification code is: ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ 
      message: 'Failed to send OTP. Please try again.' 
    });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ 
        message: 'Phone number and OTP are required' 
      });
    }

    const storedData = otpStore.get(phone);
    
    if (!storedData) {
      return res.status(400).json({ 
        message: 'OTP not found or expired. Please request a new one.' 
      });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ 
        message: 'OTP expired. Please request a new one.' 
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ 
        message: 'Invalid OTP. Please try again.' 
      });
    }

    // OTP verified successfully
    otpStore.delete(phone);
    
    // Generate JWT token (install jsonwebtoken)
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { phone },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      success: true, 
      message: 'OTP verified successfully',
      token,
      user: { phone }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ 
      message: 'Failed to verify OTP. Please try again.' 
    });
  }
});

module.exports = router;
```

3. **Environment Variables (.env):**
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
JWT_SECRET=your_jwt_secret_key
```

### Option 2: Using Firebase Authentication

1. **Install Firebase:**
```bash
npm install firebase-admin
```

2. **Setup Firebase Phone Auth:**
```javascript
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});

router.post('/send-otp', async (req, res) => {
  // Firebase handles OTP automatically
  // Just verify on frontend using Firebase SDK
});
```

### Option 3: Using MSG91 (Popular in India)

```javascript
const axios = require('axios');

router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  
  await axios.get(`https://api.msg91.com/api/v5/otp`, {
    params: {
      template_id: process.env.MSG91_TEMPLATE_ID,
      mobile: phone,
      authkey: process.env.MSG91_AUTH_KEY,
      otp: otp
    }
  });
  
  // Store OTP in database or Redis
  otpStore.set(phone, { otp, expiresAt: Date.now() + 300000 });
  
  res.json({ success: true });
});
```

### Quick Testing Setup (Development Only)

For testing without a real SMS service, you can log the OTP to console:

```javascript
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  
  // Store OTP
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  // Log to console (ONLY FOR DEVELOPMENT)
  console.log(`📱 OTP for ${phone}: ${otp}`);
  
  res.json({ 
    success: true, 
    message: 'OTP sent successfully',
    // Remove this in production
    debug_otp: process.env.NODE_ENV === 'development' ? otp : undefined
  });
});
```

### Frontend Configuration

Update your frontend to use the correct API URL:

```typescript
// In AuthModal.tsx, update the fetch URLs:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Then use:
const response = await fetch(`${API_URL}/api/auth/send-otp`, {
  // ... rest of the code
});
```

### Production Considerations

1. **Rate Limiting:** Implement rate limiting to prevent OTP spam
2. **Redis:** Use Redis instead of Map for storing OTPs in production
3. **Security:** Add CORS configuration
4. **Monitoring:** Log all OTP attempts for security monitoring
5. **Phone Validation:** Validate phone number format and region

### Example Complete Backend Setup

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Now your OTP system will work properly! Choose the service that best fits your needs and budget.
