# Production Deployment Guide for GitHub OAuth

## The Problem
When you deploy to a live website (like Vercel, Netlify, etc.), localhost URLs won't work anymore. You need to update your GitHub OAuth app to use your production domain.

---

## Solution: Support Both Development & Production

### Step 1: Update GitHub OAuth App for Production

1. **Go to GitHub OAuth App Settings:**
   - Visit: https://github.com/settings/developers
   - Click on your "TokeDex" OAuth app

2. **Update URLs for Production:**

   **Homepage URL:**
   ```
   https://yourdomain.com
   ```
   (Replace `yourdomain.com` with your actual domain)

   **Authorization callback URL:**
   ```
   http://localhost:5177/auth/github/callback
   https://yourdomain.com/auth/github/callback
   ```
   
   ⚠️ **Important:** GitHub allows **multiple callback URLs**! Add BOTH:
   - Development: `http://localhost:5177/auth/github/callback`
   - Production: `https://yourdomain.com/auth/github/callback`
   
   This way it works in both environments!

3. **Click "Update application"**

---

## Step 2: Environment Variables for Production

### For Vercel Deployment:

1. **Go to Vercel Dashboard:**
   - Select your project
   - Go to "Settings" → "Environment Variables"

2. **Add These Variables:**
   ```
   VITE_EMAILJS_SERVICE_ID = service_zar0ldk
   VITE_EMAILJS_TEMPLATE_ID = template_77cwkpg
   VITE_EMAILJS_PUBLIC_KEY = dnGSiLiqUm8fCikQO
   VITE_GITHUB_CLIENT_ID = Ov23li15aKflhyw0MH4U
   ```

3. **Redeploy your app**

### For Netlify Deployment:

1. **Go to Netlify Dashboard:**
   - Select your site
   - Go to "Site settings" → "Environment variables"

2. **Add the same variables as above**

3. **Trigger new deploy**

### For Custom Server (Node.js):

Create a `.env.production` file:
```env
VITE_EMAILJS_SERVICE_ID=service_zar0ldk
VITE_EMAILJS_TEMPLATE_ID=template_77cwkpg
VITE_EMAILJS_PUBLIC_KEY=dnGSiLiqUm8fCikQO
VITE_GITHUB_CLIENT_ID=Ov23li15aKflhyw0MH4U
```

---

## Step 3: Dynamic Redirect URI (Automatic!)

Good news! The code I wrote **automatically detects** the current domain:

```typescript
const REDIRECT_URI = window.location.origin + '/auth/github/callback';
```

This means:
- Development: `http://localhost:5177/auth/github/callback`
- Production: `https://yourdomain.com/auth/github/callback`

**No code changes needed!** It works automatically.

---

## Step 4: Deploy to Production

### Option A: Vercel (Recommended - Easiest)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow prompts:**
   - Link to existing project or create new
   - Set root directory to `frontend`
   - Use default build settings

4. **Get your live URL:**
   - Example: `https://tokedex-abc123.vercel.app`

5. **Update GitHub OAuth app:**
   - Add callback URL: `https://tokedex-abc123.vercel.app/auth/github/callback`

### Option B: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod
   ```

3. **Get your live URL:**
   - Example: `https://tokedex.netlify.app`

4. **Update GitHub OAuth app:**
   - Add callback URL: `https://tokedex.netlify.app/auth/github/callback`

### Option C: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/tokedex"
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

4. **Update GitHub OAuth app:**
   - Add callback URL: `https://yourusername.github.io/tokedex/auth/github/callback`

---

## Step 5: Custom Domain (Optional)

If you want your own domain like `tokedex.com`:

1. **Buy a domain** (Namecheap, GoDaddy, Google Domains)

2. **Connect to Vercel/Netlify:**
   - Go to project settings
   - Add custom domain
   - Update DNS records (they'll guide you)

3. **Update GitHub OAuth app:**
   - Homepage URL: `https://tokedex.com`
   - Callback URL: `https://tokedex.com/auth/github/callback`

---

## Complete Deployment Checklist

### ✅ Before Deployment:
- [ ] Build works locally: `npm run build`
- [ ] No TypeScript errors: `npm run type-check` (if available)
- [ ] Environment variables ready
- [ ] GitHub OAuth app created

### ✅ During Deployment:
- [ ] Deploy to Vercel/Netlify/etc.
- [ ] Add environment variables to hosting platform
- [ ] Get production URL

### ✅ After Deployment:
- [ ] Update GitHub OAuth app with production callback URL
- [ ] Test login on live site
- [ ] Test GitHub OAuth on live site
- [ ] Test email notifications

---

## Multiple Environment Setup (Advanced)

If you want separate OAuth apps for dev/staging/production:

### Development OAuth App:
```
Name: TokeDex (Development)
Homepage: http://localhost:5177
Callback: http://localhost:5177/auth/github/callback
Client ID: Ov23li_DEV_xxxx
```

### Production OAuth App:
```
Name: TokeDex
Homepage: https://tokedex.com
Callback: https://tokedex.com/auth/github/callback
Client ID: Ov23li_PROD_yyyy
```

Then use different `.env` files:
- `.env.development` - for local dev
- `.env.production` - for production

---

## Testing Production Deployment

1. **Deploy your app**
2. **Go to live URL**: `https://your-site.vercel.app`
3. **Click "Continue with GitHub"**
4. **Should redirect to GitHub authorization**
5. **After approval, should redirect back to your site**
6. **User should be logged in!**

---

## Common Issues & Solutions

### Issue: "Redirect URI mismatch"
**Solution:** Make sure the callback URL in GitHub OAuth app EXACTLY matches your production domain

### Issue: "Application not authorized"
**Solution:** Check that your Client ID in production environment variables is correct

### Issue: OAuth works locally but not in production
**Solution:** 
- Check environment variables are set in hosting platform
- Verify callback URL includes `https://` (not `http://`)
- Clear browser cache and try again

### Issue: "Invalid state parameter"
**Solution:** This is normal if user navigates away and comes back. Just try logging in again.

---

## Quick Deploy Commands

### Vercel:
```bash
cd frontend
vercel --prod
```

### Netlify:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages:
```bash
cd frontend
npm run deploy
```

---

## Summary

**The key is:** GitHub OAuth allows multiple callback URLs, so add BOTH:
1. ✅ Development: `http://localhost:5177/auth/github/callback`
2. ✅ Production: `https://yourdomain.com/auth/github/callback`

Then it works everywhere automatically! 🎉

**Your app will automatically use the correct callback URL based on where it's running - no code changes needed!**
