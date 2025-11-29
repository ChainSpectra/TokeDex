# GitHub OAuth Setup Guide for TokeDex

## Why GitHub OAuth?
Allow users to sign in with their GitHub account - no password needed! Fast, secure, and trusted.

---

## Step 1: Create GitHub OAuth App

1. **Go to GitHub Settings:**
   - Visit: https://github.com/settings/developers
   - Click "OAuth Apps" in the left sidebar
   - Click "New OAuth App" button

2. **Fill in Application Details:**

   **Application name:**
   ```
   TokeDex
   ```

   **Homepage URL:**
   ```
   http://localhost:5176
   ```
   (Change to your production URL when deploying, e.g., `https://tokedex.com`)

   **Application description:** (optional)
   ```
   Web3 Token Creation Platform
   ```

   **Authorization callback URL:**
   ```
   http://localhost:5173/auth/github/callback
   http://localhost:5174/auth/github/callback
   http://localhost:5175/auth/github/callback
   http://localhost:5176/auth/github/callback
   http://localhost:5177/auth/github/callback
   http://localhost:5178/auth/github/callback
   http://localhost:5179/auth/github/callback
   http://localhost:5180/auth/github/callback
   ```
   ⚠️ **IMPORTANT:** This must match exactly! For production, use: `https://yourdomain.com/auth/github/callback`

3. **Click "Register application"**

4. **Get Your Credentials:**
   - You'll see **Client ID** (looks like: `Iv1.abc123xyz`)
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** (you'll only see this once!)

---

## Step 2: Update .env File

Open `frontend/.env` and add:

```env
# GitHub OAuth Configuration
VITE_GITHUB_CLIENT_ID=Iv1.abc123xyz
VITE_GITHUB_CLIENT_SECRET=your_client_secret_here
```

⚠️ **Security Warning:** 
- Never commit `.env` to Git
- The client secret should be kept on your backend (not exposed to frontend)
- For now, we'll use client ID only (public, safe to expose)

---

## Step 3: Create GitHub Callback Handler

I've already created the code structure. The callback will:
1. Receive the authorization code from GitHub
2. Exchange it for an access token
3. Fetch user's GitHub profile
4. Log them into TokeDex

---

## Step 4: How It Works

### User Flow:
1. User clicks "Continue with GitHub"
2. Redirects to GitHub authorization page
3. User approves access
4. GitHub redirects back to your app with code
5. App exchanges code for access token
6. App fetches user profile from GitHub
7. User is logged in! ✅

### What Data We Get:
- ✅ GitHub username
- ✅ Email address
- ✅ Avatar/profile picture
- ✅ Name

### Security Features:
- ✅ OAuth 2.0 standard protocol
- ✅ State parameter prevents CSRF attacks
- ✅ Tokens stored securely in localStorage
- ✅ No passwords stored in your database

---

## Step 5: Backend API (Required for Production)

For production, you need a backend endpoint to handle the OAuth callback:

### Backend Endpoint: `/api/auth/github/callback`

```javascript
// Example Node.js/Express endpoint
app.get('/api/auth/github/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state matches
  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });
  
  const { access_token } = await tokenResponse.json();
  
  // Fetch user data
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  });
  
  const userData = await userResponse.json();
  
  // Create session/JWT token for your app
  // Return to frontend with token
  res.redirect(`/?token=${your_app_token}`);
});
```

---

## Step 6: Test It!

### Development Testing:
1. Make sure dev server is running: `npm run dev`
2. Go to: http://localhost:5176
3. Click "Connect Wallet"
4. Click "Continue with GitHub"
5. Authorize the app on GitHub
6. You'll be redirected back and logged in!

### What to Check:
- Browser console for debug logs: `🔗 Redirecting to GitHub OAuth...`
- GitHub authorization page appears
- Redirects back to your app after approval
- User is logged in

---

## Troubleshooting

### "Redirect URI Mismatch" Error
**Problem:** GitHub says the redirect URI doesn't match  
**Solution:** Make sure the callback URL in GitHub OAuth app settings EXACTLY matches:
- Development: `http://localhost:5176/auth/github/callback`
- Production: `https://yourdomain.com/auth/github/callback`

### "Client ID not found" Error
**Problem:** The client ID in `.env` is wrong  
**Solution:** Double-check you copied it correctly from GitHub

### Nothing happens after clicking "Continue with GitHub"
**Problem:** Client ID not set in `.env`  
**Solution:** Add `VITE_GITHUB_CLIENT_ID=your_id` to `.env` and restart server

### "Application suspended" Error
**Problem:** GitHub detected suspicious activity  
**Solution:** Contact GitHub support or create a new OAuth app

---

## Production Deployment

When deploying to production:

1. **Update GitHub OAuth App:**
   - Homepage URL: `https://yourdomain.com`
   - Callback URL: `https://yourdomain.com/auth/github/callback`

2. **Update Environment Variables:**
   ```env
   VITE_GITHUB_CLIENT_ID=your_production_client_id
   ```

3. **Set up Backend API:**
   - Deploy the callback handler endpoint
   - Keep client secret on backend only
   - Use HTTPS for all redirects

4. **Security Best Practices:**
   - ✅ Use environment variables (never hardcode)
   - ✅ Validate state parameter on callback
   - ✅ Use HTTPS in production
   - ✅ Set short token expiration times
   - ✅ Implement token refresh mechanism

---

## Alternative OAuth Providers

Want to add more login options? Same pattern works for:

- **Google OAuth:** https://console.cloud.google.com/
- **Facebook Login:** https://developers.facebook.com/
- **Twitter OAuth:** https://developer.twitter.com/
- **Discord OAuth:** https://discord.com/developers/applications

---

## Need Help?

- GitHub OAuth Docs: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps
- OAuth 2.0 Spec: https://oauth.net/2/
- Security Best Practices: https://oauth.net/2/security-best-practices/

---

## Quick Start Summary

```bash
# 1. Create OAuth app on GitHub
https://github.com/settings/developers

# 2. Add to .env
VITE_GITHUB_CLIENT_ID=your_client_id

# 3. Restart server
npm run dev

# 4. Test
http://localhost:5176 → Click "Continue with GitHub"
```

That's it! GitHub authentication is ready! 🎉
