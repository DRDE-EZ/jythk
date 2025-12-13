# 🔴 Google OAuth 404 Error - Troubleshooting

## The Error:
```
GET https://www.jythk.com/.../api/oauth2/authorize?clientId=...
404 (Not Found)
```

## Root Cause:
The Wix SDK is generating an **incorrect authorization URL**. It's trying to use `www.jythk.com` as the OAuth server, but OAuth requests should go to **Wix's servers**, not your site.

---

## ✅ IMMEDIATE FIX - Check Wix OAuth Application Settings

### Step 1: Verify OAuth App Configuration in Wix

1. **Go to Wix Headless Settings:**
   - https://manage.wix.com/account/api-keys
   - Or: Wix Dashboard → Settings → Headless Settings

2. **Find Your OAuth Application:**
   - Look for Client ID: `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
   - Check the **"Type"** - should be **"OAuth Application"** or **"Headless OAuth"**

3. **Verify App Status:**
   - Must be **"Published"** or **"Active"** (not Draft)
   - If it shows "Pending" or "Inactive", click **"Activate"** or **"Publish"**

4. **Check Redirect URLs Are Saved:**
   - Should show all three redirect URLs we added earlier
   - Click "Edit" to verify they're there
   - Click "Save" again to ensure they're committed

---

### Step 2: Verify Environment Variables (Production)

**In Vercel Dashboard:**
- https://vercel.com/drde-ezs-projects/jythk/settings/environment-variables

Check these variables exist and are correct:

```bash
NEXT_PUBLIC_WIX_CLIENT_ID=5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e
NEXT_PUBLIC_WIX_SITE_ID=6b95797b-c6a5-4da3-8c58-adebd4e6fc60
NEXT_PUBLIC_BASE_URL=https://jythk.vercel.app
NEXT_PUBLIC_WIX_REDIRECT_URL=https://jythk.vercel.app/api/auth/callback/wix
```

**Make sure ALL are set for ALL environments** (Production, Preview, Development)

---

### Step 3: Check Local Environment (If testing localhost)

If you're testing on `http://localhost:3001`, you need local environment variables:

**Create/Update `.env.local`:**
```bash
NEXT_PUBLIC_WIX_CLIENT_ID=5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e
NEXT_PUBLIC_WIX_SITE_ID=6b95797b-c6a5-4da3-8c58-adebd4e6fc60
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXT_PUBLIC_WIX_REDIRECT_URL=http://localhost:3001/api/auth/callback/wix
WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjUzMTc0NTc2LTAyMmItNGJhYi1iMjMyLWIyOGE4NDA4MzFkM1wiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjc1MDNkNWFmLTQ4YmQtNDFjNC05YzNkLTZmZTI4YzViYjc0YlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzY1MzcxNDQzfQ.cyn7fVonfE5HQqgRtsT4jIxt03aTlM-0NGcFKqH4IHiLo7dFS85KwvVLGDIMSe51kq-i6vXfRDCR_eKRpjr0YcawtYYeR-zfvs1NG-u2UlW0b-uKMKLr3ZeLz7alge3zFCHsvm0fdds1DeQTFZb0A4JulkdhKC3_ZHz2-f-uCNRR6mmKuxe3ynYJT8HZx_D7xzjDlly8vo3u1IaQoGK0QDCO57WA0n58vJWijjC5FvBZpTb_EbguCpkXxQsOFD1xXzRJAG-Bn8Ivp5XMfEvMwhhrPD3OF6ZH7KpB-oFitb4X3SDEX9u0EjJamtYhC51qiTlQpZ3zrDehl_2PbGu4qA
```

**Then restart dev server:**
```bash
npm run dev
```

---

### Step 4: Test on Production Site (Not Localhost)

The easiest way to test if it's just a local environment issue:

1. **Go directly to production:**
   - https://jythk.vercel.app/login

2. **Click "Continue with Google"**

3. **Should redirect to:**
   - Google sign-in page (NOT jythk.com)
   - URL should be: `https://accounts.google.com/...`

If it works on production but not localhost, it's just a local env variable issue.

---

## 🔍 What the OAuth URL SHOULD Look Like:

**Correct OAuth flow:**
```
Your Site (jythk.vercel.app/login)
  ↓ Click "Continue with Google"
  ↓
Wix OAuth Server (managed by Wix)
  ↓ Redirects to
  ↓
Google Sign-In (accounts.google.com)
  ↓ User signs in
  ↓
Callback to Your Site (jythk.vercel.app/api/auth/callback/wix)
```

**The URL should NEVER go to `www.jythk.com/api/oauth2/authorize`** - that endpoint doesn't exist on your site!

---

## 🐛 If Still Getting 404:

### Possible Cause 1: Wrong OAuth App Type
- In Wix, check if the app is type "OAuth" not "API Key Only"
- API Key apps don't support OAuth login

### Possible Cause 2: App Not Published
- Draft OAuth apps don't work
- Must be "Published" or "Active" status

### Possible Cause 3: Client ID Mismatch
- The Client ID in code doesn't match Wix
- Verify: `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
- Check in Wix Headless Settings if this ID exists

### Possible Cause 4: Wix SDK Version Issue
- Check package.json: `@wix/sdk` should be `^1.17.1`
- If older version, run: `npm install @wix/sdk@latest`

---

## 📞 Debug Steps:

1. **Check Browser Console (F12):**
   - Look for the FULL authorization URL being generated
   - Should start with `https://www.wix.com/oauth/...` or similar Wix domain
   - If it shows `https://www.jythk.com/...`, environment variables are wrong

2. **Check Network Tab:**
   - See what request is failing
   - Look at the Request URL
   - Check Response

3. **Test with Simple Redirect:**
   - Go directly to: `https://jythk.vercel.app/api/auth/callback/wix`
   - Should show error but NOT 404 on the route itself

---

## ✅ Quick Test Checklist:

- [ ] Wix OAuth app is "Published" / "Active" status
- [ ] Redirect URLs are saved in Wix OAuth settings
- [ ] Environment variables exist in Vercel
- [ ] Testing on production URL (not localhost) works
- [ ] Browser console shows correct OAuth URL (Wix domain, not jythk.com)
- [ ] No ad blockers or browser extensions blocking OAuth

---

**Most Likely Issue:** Testing on localhost without proper `.env.local` file OR Wix OAuth app is not activated/published.

**Quick Fix:** Test on production first: https://jythk.vercel.app/login
