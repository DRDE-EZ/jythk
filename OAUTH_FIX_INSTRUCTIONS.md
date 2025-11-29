# Google Sign-In Fix - Complete Instructions

## Problem
OAuth callback returning 404 errors after Google authentication.

## Root Cause
The Wix OAuth redirect URL in your Wix Dashboard doesn't match your Vercel deployment URL.

## SOLUTION - Follow These Steps:

### Step 1: Configure Wix OAuth Redirect URL

1. Go to https://manage.wix.com/account/api-keys
2. Find your API Key with Client ID: `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
3. Click "Edit" or "Settings"
4. Find the "OAuth Redirect URLs" or "Allowed Redirect URIs" section
5. **Add BOTH of these URLs:**
   - `https://jythk.vercel.app/api/auth/callback/wix`
   - `https://www.jythk.com/api/auth/callback/wix` (when domain is connected)
6. **IMPORTANT:** Make sure to SAVE the changes

### Step 2: Add Environment Variable in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project: **jythk**
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   - **Name:** `NEXT_PUBLIC_WIX_REDIRECT_URL`
   - **Value:** `https://jythk.vercel.app/api/auth/callback/wix`
   - **Environments:** Check all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab in Vercel
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (2-3 minutes)

### Step 4: Test

1. Clear your browser cache or open an incognito window
2. Go to your site: https://jythk.vercel.app
3. Click the user icon → Sign in with Google
4. Complete Google authentication
5. You should be redirected to your dashboard successfully

## Verification Checklist

- [ ] Wix Dashboard has the redirect URL configured
- [ ] Vercel has NEXT_PUBLIC_WIX_REDIRECT_URL environment variable set
- [ ] Site has been redeployed after adding the variable
- [ ] Browser cache cleared before testing

## If Still Not Working

Check browser console (F12) for errors and send me:
1. The exact error message
2. The URL you're redirected to
3. Any console errors (red text in Console tab)
