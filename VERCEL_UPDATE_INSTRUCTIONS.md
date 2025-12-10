# 🚨 CRITICAL: Update Vercel Environment Variables

## ✅ STEP 1: Update WIX_API_KEY in Vercel

Your WIX_API_KEY has been updated locally. Now you MUST update it in Vercel:

### Go to Vercel Dashboard:
1. Visit: https://vercel.com/dashboard
2. Select your project: **jythk**
3. Go to **Settings** → **Environment Variables**

### Update WIX_API_KEY:
1. Find the existing `WIX_API_KEY` variable
2. Click **Edit** (pencil icon)
3. Replace the value with:
```
IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjUzMTc0NTc2LTAyMmItNGJhYi1iMjMyLWIyOGE4NDA4MzFkM1wiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjc1MDNkNWFmLTQ4YmQtNDFjNC05YzNkLTZmZTI4YzViYjc0YlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzY1MzcxNDQzfQ.cyn7fVonfE5HQqgRtsT4jIxt03aTlM-0NGcFKqH4IHiLo7dFS85KwvVLGDIMSe51kq-i6vXfRDCR_eKRpjr0YcawtYYeR-zfvs1NG-u2UlW0b-uKMKLr3ZeLz7alge3zFCHsvm0fdds1DeQTFZb0A4JulkdhKC3_ZHz2-f-uCNRR6mmKuxe3ynYJT8HZx_D7xzjDlly8vo3u1IaQoGK0QDCO57WA0n58vJWijjC5FvBZpTb_EbguCpkXxQsOFD1xXzRJAG-Bn8Ivp5XMfEvMwhhrPD3OF6ZH7KpB-oFitb4X3SDEX9u0EjJamtYhC51qiTlQpZ3zrDehl_2PbGu4qA
```
4. Make sure **Production**, **Preview**, and **Development** are all checked
5. Click **Save**

---

## ✅ STEP 2: Redeploy WITHOUT Cache

**CRITICAL:** You must redeploy WITHOUT using the build cache:

1. Go to the **Deployments** tab in Vercel
2. Find the latest deployment (at the top)
3. Click the **three dots (...)** menu on the right
4. Click **Redeploy**
5. **⚠️ IMPORTANT:** **UNCHECK** the box that says "Use existing Build Cache"
6. Click **Redeploy** button
7. Wait 3-5 minutes for the build to complete

---

## ✅ STEP 3: Verify Deployment

After deployment completes:

1. Visit: https://jythk.vercel.app
2. The site should load successfully (no 404 error)
3. Check the build logs - you should NOT see "Entity not found: UNKNOWN" anymore

---

## ✅ STEP 4: Test OAuth Login

Once the site is live:

1. Go to: https://jythk.vercel.app/test-login
2. Click **"Test Google Sign-In"**
3. Complete Google authentication
4. You should be redirected back successfully

**If OAuth still fails:**
- Make sure Wix OAuth redirect URL is set to: `https://jythk.vercel.app/api/auth/callback/wix`
- Check browser console (F12) for error messages

---

## 📧 STEP 5: Configure SendGrid DNS (After OAuth Works)

Once OAuth is working, add these DNS records to your domain `jythk.com` in Wix:

### Go to Wix DNS Settings:
https://manage.wix.com/domains → jythk.com → DNS

### Add 6 DNS Records:

#### CNAME Records (5):
1. **Host:** `url5524` → **Value:** `sendgrid.net` → **TTL:** 3600
2. **Host:** `57677616` → **Value:** `sendgrid.net` → **TTL:** 3600
3. **Host:** `em3333` → **Value:** `u57677616.wl165.sendgrid.net` → **TTL:** 3600
4. **Host:** `s1._domainkey` → **Value:** `s1.domainkey.u57677616.wl165.sendgrid.net` → **TTL:** 3600
5. **Host:** `s2._domainkey` → **Value:** `s2.domainkey.u57677616.wl165.sendgrid.net` → **TTL:** 3600

#### TXT Record (1):
6. **Host:** `_dmarc` → **Value:** `v=DMARC1; p=none;` → **TTL:** 3600

**Note:** DNS propagation takes 24-48 hours. Your contact/partner forms will still work without this, but emails may go to spam.

---

## 🎯 Priority Checklist

- [ ] **HIGHEST:** Update WIX_API_KEY in Vercel
- [ ] **HIGHEST:** Redeploy Vercel WITHOUT cache
- [ ] **HIGH:** Verify https://jythk.vercel.app loads
- [ ] **MEDIUM:** Test OAuth login at /test-login
- [ ] **LOW:** Add SendGrid DNS records (can be done later)

---

## 🆘 If You Need Help

1. Check Vercel build logs for errors
2. Check browser console (F12) for errors
3. Send me screenshots of any errors you see

**This should fix your deployment! 🚀**
