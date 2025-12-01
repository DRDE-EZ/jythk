# 🚨 PRODUCTION DEPLOYMENT FIX - COMPLETE CHECKLIST

## Current Issue: Site showing "DEPLOYMENT_NOT_FOUND" 404 error

This means the Vercel deployment failed. Follow these steps IN ORDER:

---

## ✅ Step 1: Verify Vercel Environment Variables

Go to: https://vercel.com/dashboard → Select **jythk** → **Settings** → **Environment Variables**

### Required Variables (Must have ALL of these):

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `NEXT_PUBLIC_WIX_CLIENT_ID` | `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e` | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_WIX_SITE_ID` | `6b95797b-c6a5-4da3-8c58-adebd4e6fc60` | ✅ Production ✅ Preview ✅ Development |
| `WIX_API_KEY` | `JWS.eyJraWQiOiJQS3FLMnQ4TSIsImFsZyI6IlJTMjU2In0...` (your full API key) | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_BASE_URL` | `https://jythk.vercel.app` | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_WIX_REDIRECT_URL` | `https://jythk.vercel.app/api/auth/callback/wix` | ✅ Production ✅ Preview ✅ Development |

### Optional (for email notifications - can add later):
| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `SENDGRID_API_KEY` | `SG.xxxxx` (from SendGrid) | ✅ Production ✅ Preview ✅ Development |
| `SENDGRID_FROM_EMAIL` | `your-email@jythk.com` | ✅ Production ✅ Preview ✅ Development |
| `CONTACT_EMAIL_TO` | `bernarddawson22@gmail.com` | ✅ Production ✅ Preview ✅ Development |

---

## ✅ Step 2: Redeploy on Vercel

1. Go to **Deployments** tab in Vercel
2. Click the **three dots (...)** on the latest deployment
3. Click **Redeploy**
4. ⚠️ Make sure to check **"Use existing Build Cache"** is OFF
5. Click **Redeploy** button
6. Wait 3-5 minutes for build to complete

---

## ✅ Step 3: Configure Wix OAuth Redirect URLs

Go to: https://manage.wix.com/account/api-keys

1. Find your API Key with Client ID: `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
2. Click **Edit** or **Settings**
3. Find **OAuth Redirect URLs** section
4. Add these URLs:
   - `https://jythk.vercel.app/api/auth/callback/wix`
   - `https://www.jythk.com/api/auth/callback/wix`
5. **SAVE** the changes

---

## ✅ Step 4: Test the Deployment

### A. Check if site is online:
- Visit: https://jythk.vercel.app
- Should show your homepage (NOT 404)

### B. Check health endpoint:
- Visit: https://jythk.vercel.app/api/health
- Should show JSON with `"status": "ok"`

### C. Test login:
- Visit: https://jythk.vercel.app/test-login
- Click "Test Google Sign-In"
- Should redirect to Google
- After signing in, should redirect back to dashboard

---

## ✅ Step 5: SendGrid Domain Setup (For Email Notifications)

### Domain to use: `jythk.com` (without www)

1. Go to SendGrid: https://app.sendgrid.com/settings/sender_auth/domain/create
2. Enter domain: `jythk.com`
3. SendGrid will show DNS records to add
4. Add these DNS records in **Wix DNS** (where you bought jythk.com):
   - Go to Wix: https://manage.wix.com/domains
   - Select `jythk.com`
   - Go to **DNS** settings
   - Add all CNAME and TXT records from SendGrid

5. Wait 24-48 hours for DNS propagation
6. Verify in SendGrid

### Alternative (Faster): Use Gmail as sender

Instead of domain authentication:
1. In SendGrid, create **Single Sender Verification**
2. Use: `bernarddawson22@gmail.com`
3. Verify the email (check Gmail inbox)
4. Use this as `SENDGRID_FROM_EMAIL` in Vercel

---

## 🔍 Troubleshooting

### If site still shows 404:
1. Check Vercel deployment logs for errors
2. Make sure all environment variables are set
3. Try **Redeploy** again with cache OFF

### If login fails:
1. Check browser console (F12) for errors
2. Verify Wix OAuth redirect URLs are saved
3. Visit: https://jythk.vercel.app/test-login for detailed error

### If emails don't send:
1. Check `SENDGRID_API_KEY` is set in Vercel
2. Check sender email is verified in SendGrid
3. Check spam folder

---

## 📞 Quick Support Checks

Run these commands locally to verify:
```bash
cd c:\Users\geniu\forma\konkweb
npm run build
```

If build succeeds locally, the issue is Vercel environment variables.

---

## ⚡ Priority Order:

1. **FIRST**: Fix environment variables → Redeploy
2. **SECOND**: Test OAuth login works
3. **THIRD**: Set up SendGrid emails (can wait)

---

**Current Status**: Deployment is failing. Start with Step 1 above.
