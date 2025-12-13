# 🔧 Google Login Fix - Complete Steps

## Current Status
- ✅ Code is correct and deployed
- ⚠️ Wix OAuth redirect URL needs configuration
- ⚠️ Environment variables need verification

---

## 🚨 CRITICAL STEPS TO FIX GOOGLE LOGIN

### Step 1: Configure Wix OAuth Redirect URL

**This is the MOST IMPORTANT step!**

1. **Go to Wix API Keys Dashboard:**
   - Visit: https://manage.wix.com/account/api-keys
   - Log in with your Wix account

2. **Find Your API Key:**
   - Look for the key with Client ID: `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
   - Click **"Edit"** or the settings icon

3. **Configure OAuth Redirect URLs:**
   - Look for section: **"OAuth Redirect URLs"** or **"Allowed Redirect URIs"**
   - Click **"Add URL"** or **"+"** button
   - Add these EXACT URLs:
     ```
     https://jythk.vercel.app/api/auth/callback/wix
     https://www.jythk.com/api/auth/callback/wix
     ```
   - Make sure there are NO trailing slashes
   - Make sure they are HTTPS (not HTTP)

4. **Save Changes:**
   - Click **"Save"** or **"Update"**
   - Wait for confirmation message

**Why this matters:**
- Wix will ONLY redirect to URLs you whitelist
- Without this, Google login will fail with "not found" or "redirect_uri_mismatch"

---

### Step 2: Verify Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: **jythk**
   - Click **Settings** → **Environment Variables**

2. **Check These Variables Exist:**

   #### NEXT_PUBLIC_WIX_CLIENT_ID
   - **Name:** `NEXT_PUBLIC_WIX_CLIENT_ID`
   - **Value:** `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development

   #### NEXT_PUBLIC_WIX_SITE_ID
   - **Name:** `NEXT_PUBLIC_WIX_SITE_ID`
   - **Value:** `6b95797b-c6a5-4da3-8c58-adebd4e6fc60`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development

   #### WIX_API_KEY
   - **Name:** `WIX_API_KEY`
   - **Value:** Your full API key (starts with `IST.eyJ...`)
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development

   #### NEXT_PUBLIC_BASE_URL
   - **Name:** `NEXT_PUBLIC_BASE_URL`
   - **Value:** `https://jythk.vercel.app`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development

   #### NEXT_PUBLIC_WIX_REDIRECT_URL
   - **Name:** `NEXT_PUBLIC_WIX_REDIRECT_URL`
   - **Value:** `https://jythk.vercel.app/api/auth/callback/wix`
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development

3. **If Any Are Missing:**
   - Click **"Add New"**
   - Enter name and value exactly as shown
   - Check all three environment boxes
   - Click **"Save"**

---

### Step 3: Redeploy Vercel

**IMPORTANT:** Changes to environment variables require a fresh deployment.

1. **Go to Deployments Tab:**
   - Click **Deployments** in top menu

2. **Redeploy Latest:**
   - Find the most recent deployment (top of list)
   - Click **three dots (...)** on the right
   - Click **"Redeploy"**
   - ⚠️ **UNCHECK** "Use existing Build Cache"
   - Click **"Redeploy"**

3. **Wait for Deployment:**
   - Takes 3-5 minutes
   - Watch build logs for errors
   - Wait for "Deployment Ready" ✅

---

### Step 4: Test Google Login

1. **Clear Browser Data:**
   - Open browser in **Incognito/Private mode**
   - Or clear all cookies for jythk.vercel.app

2. **Visit Your Site:**
   - Go to: https://jythk.vercel.app

3. **Test Login:**
   - Click user icon (top right)
   - Click **"Sign in with Google"**
   - Select your Google account
   - Complete Google authentication

4. **Expected Result:**
   - Redirected back to: https://jythk.vercel.app/customer-dashboard-protected
   - You should be logged in
   - Should see your dashboard

---

## 🐛 Troubleshooting

### Error: "not found" or 404
**Cause:** OAuth redirect URL not configured in Wix Dashboard

**Fix:**
1. Go to Wix Dashboard → API Keys
2. Add redirect URL: `https://jythk.vercel.app/api/auth/callback/wix`
3. Save and redeploy

---

### Error: "redirect_uri_mismatch"
**Cause:** Redirect URL doesn't match exactly

**Fix:**
1. Check Wix Dashboard redirect URLs have NO trailing slash
2. Must be HTTPS (not HTTP)
3. Must match exactly: `https://jythk.vercel.app/api/auth/callback/wix`

---

### Redirects to Google but comes back to 404
**Cause:** Callback route not accessible

**Fix:**
1. Verify `/api/auth/callback/wix/route.ts` exists
2. Check Vercel build logs for errors
3. Redeploy without cache

---

### Console Shows "Missing OAuth data"
**Cause:** Cookie not being stored properly

**Fix:**
1. Check browser allows third-party cookies
2. Try in different browser
3. Clear all site data and retry

---

### Still Not Working?

**Debug Steps:**

1. **Open Browser Console (F12):**
   - Click **Console** tab
   - Look for red error messages
   - Send screenshots of errors

2. **Check Network Tab:**
   - Click **Network** tab
   - Click "Sign in with Google"
   - Look for failed requests (red status)
   - Check request details

3. **Test OAuth Callback Directly:**
   - Visit: https://jythk.vercel.app/api/auth/callback/wix
   - Should return: "Missing code or state" (this is expected)
   - If it returns 404, callback route is not deployed

---

## ✅ Success Checklist

- [ ] Wix Dashboard has redirect URL configured
- [ ] All environment variables set in Vercel
- [ ] Site redeployed without cache
- [ ] Browser cache cleared/incognito mode used
- [ ] Google login redirects properly
- [ ] User lands on dashboard after login
- [ ] User info displays correctly

---

## 📞 If You Need More Help

Send me:
1. Screenshot of Wix OAuth redirect URLs section
2. Screenshot of Vercel environment variables
3. Screenshot of browser console errors (F12 → Console)
4. The exact URL you're redirected to when it fails
5. Any error messages you see

---

**The fix is mostly configuration, not code. Follow Step 1 carefully! 🎯**
