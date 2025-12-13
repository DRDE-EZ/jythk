# 🚀 Complete Setup Guide - Google OAuth & SendGrid

## 📋 Table of Contents
1. [Google OAuth Login Setup](#google-oauth-login-setup)
2. [SendGrid Email Setup](#sendgrid-email-setup)
3. [Vercel Environment Variables](#vercel-environment-variables)

---

## 🔐 Google OAuth Login Setup

### Problem:
Google login button on `/login` page isn't working because Wix needs the redirect URL configured.

### ✅ Step-by-Step Fix:

#### 1. Go to Wix Headless Settings
- Login to: https://manage.wix.com
- Go to: **Settings** → **Headless Settings**
- Or direct link: https://manage.wix.com/account/api-keys

#### 2. Find Your OAuth Application
- Look for OAuth app with Client ID: `5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e`
- Click **"Edit"** or **"Configure"**

#### 3. Add Redirect URLs
Add these EXACT URLs to the **"Allowed Redirect URLs"** section:

```
https://jythk.vercel.app/api/auth/callback/wix
https://jythk.com/api/auth/callback/wix
http://localhost:3001/api/auth/callback/wix
```

**Important:** 
- ✅ Include the `/api/auth/callback/wix` path
- ✅ Add both your custom domain (jythk.com) and Vercel domain
- ✅ Add localhost for testing
- ✅ Use HTTPS for production URLs

#### 4. Save Changes
- Click **"Save"** or **"Update"**
- Changes take effect immediately

#### 5. Test the Login
- Go to: https://jythk.vercel.app/login
- Click **"Continue with Google"**
- Should redirect to Google sign-in
- After signing in, redirects back to your site

### 🔍 How to Verify It Works:
1. Open browser in incognito/private mode
2. Go to: https://jythk.vercel.app/login
3. Click "Continue with Google"
4. Should see Google account selection screen
5. Select account → Should redirect back to your site logged in
6. Check top right corner for profile icon/name

---

## 📧 SendGrid Email Setup

### What is SendGrid?
SendGrid sends email notifications when users submit:
- Contact form (`/contact` page)
- Partner inquiry form (`/partners` page)

### ✅ Complete SendGrid Setup (30 minutes):

#### Step 1: Create SendGrid Account
1. Go to: https://signup.sendgrid.com/
2. Sign up with your email
3. Choose **FREE** plan (100 emails/day forever)
4. Verify your email address

#### Step 2: Create API Key
1. Login to SendGrid dashboard: https://app.sendgrid.com/
2. Go to: **Settings** → **API Keys** (left sidebar)
3. Click: **"Create API Key"** (top right)
4. **Name:** `Jythk Website`
5. **API Key Permissions:** Select **"Full Access"** (recommended) or **"Restricted Access"**
   - If Restricted: Enable "Mail Send" permission
6. Click: **"Create & View"**
7. **COPY THE API KEY** - You'll only see it once!
   - Format: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Store it safely (you'll add to Vercel next)

#### Step 3: Verify Sender Email

##### Option A: Single Sender Verification (Quick - 5 min)
1. Go to: **Settings** → **Sender Authentication** → **"Verify a Single Sender"**
2. Click: **"Create New Sender"**
3. Fill out form:
   - **From Name:** `Jythk Support` or `Formex Construction`
   - **From Email Address:** Your email (e.g., `support@gmail.com` or any email you own)
   - **Reply To:** Same email as above
   - **Company Address:** Your business address
   - **Nickname:** `Jythk Main`
4. Click: **"Create"**
5. **Check your email** for verification link from SendGrid
6. Click the link to verify
7. ✅ Done! Use this email as `SENDGRID_FROM_EMAIL`

##### Option B: Domain Authentication (Professional - 30 min, better deliverability)
1. Go to: **Settings** → **Sender Authentication** → **"Authenticate Your Domain"**
2. Click: **"Get Started"**
3. Select: **"DNS Host: Other"** (or select Wix if available)
4. Enter your domain: `jythk.com`
5. Click: **"Next"**
6. SendGrid will generate **6 DNS records** (5 CNAME + 1 TXT)
7. **Keep this page open** - you'll need these records

#### Step 4: Add DNS Records to Wix (For Option B - Domain Authentication)

1. **Go to Wix DNS Settings:**
   - Login to: https://manage.wix.com
   - Go to: **Domains** → Select `jythk.com` → **DNS Records**
   - Or: https://www.wix.com/my-account/domains/

2. **Add Each DNS Record:**
   For each of the 6 records from SendGrid:

   **Example Record:**
   ```
   Type: CNAME
   Name: em1234
   Value: u1234567.wl123.sendgrid.net
   ```

   **In Wix:**
   - Click: **"Add Record"** or **"+ Add DNS Record"**
   - **Type:** Select `CNAME` or `TXT` (as shown in SendGrid)
   - **Host/Name:** Copy from SendGrid (e.g., `em1234` or `s1._domainkey`)
     - Remove your domain from the end if Wix adds it automatically
     - If SendGrid shows `em1234.jythk.com`, just enter `em1234`
   - **Value/Points To:** Copy exact value from SendGrid
   - **TTL:** Leave default (usually 3600 or 1 hour)
   - Click: **"Save"**
   - **Repeat for all 6 records**

3. **Verify in SendGrid:**
   - Go back to SendGrid verification page
   - Click: **"Verify"** button
   - If it fails, wait 15-30 minutes for DNS propagation
   - Try again

4. **Once Verified:**
   - You can send from: `noreply@jythk.com`, `support@jythk.com`, etc.
   - Use format: `anything@jythk.com` as `SENDGRID_FROM_EMAIL`

#### Step 5: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select: **jythk** project
   - Click: **Settings** → **Environment Variables**

2. **Add 3 Variables:**

   **Variable 1: SENDGRID_API_KEY**
   - **Key:** `SENDGRID_API_KEY`
   - **Value:** Your API key (starts with `SG.`)
   - **Environments:** Check ALL (Production, Preview, Development)
   - Click: **"Save"**

   **Variable 2: SENDGRID_FROM_EMAIL**
   - **Key:** `SENDGRID_FROM_EMAIL`
   - **Value:** 
     - If Single Sender: `youremail@gmail.com` (whatever you verified)
     - If Domain Auth: `noreply@jythk.com` or `support@jythk.com`
   - **Environments:** Check ALL
   - Click: **"Save"**

   **Variable 3: CONTACT_EMAIL_TO**
   - **Key:** `CONTACT_EMAIL_TO`
   - **Value:** Your email where you want to receive notifications (e.g., `your-email@gmail.com`)
   - **Environments:** Check ALL
   - Click: **"Save"**

#### Step 6: Redeploy Site

1. **In Vercel:**
   - Go to: **Deployments** tab
   - Click: **"Redeploy"** on latest deployment
   - OR make a small code change and push to trigger deployment

2. **Wait for Deployment:**
   - Should complete successfully (after npm dependency fix)
   - Check build logs for: `✅ Email sent successfully via SendGrid`

#### Step 7: Test Email Sending

1. **Go to Contact Page:**
   - https://jythk.vercel.app/contact

2. **Fill Out Form:**
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Email
   - Message: Testing SendGrid integration

3. **Submit Form:**
   - Should see success message
   - Check your email (CONTACT_EMAIL_TO) for notification

4. **Check SendGrid Dashboard:**
   - Go to: **Activity** → **Activity Feed**
   - Should see your test email listed as "Delivered"

---

## 🔧 Vercel Environment Variables - Complete List

Here's what should be in Vercel (Settings → Environment Variables):

### Authentication & Wix
```bash
NEXT_PUBLIC_WIX_CLIENT_ID=5ebcbbd4-3b43-4a26-8a0e-b8f9bb34113e
NEXT_PUBLIC_WIX_SITE_ID=6b95797b-c6a5-4da3-8c58-adebd4e6fc60
NEXT_PUBLIC_WIX_REDIRECT_URL=https://jythk.vercel.app/api/auth/callback/wix

WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjUzMTc0NTc2LTAyMmItNGJhYi1iMjMyLWIyOGE4NDA4MzFkM1wiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjc1MDNkNWFmLTQ4YmQtNDFjNC05YzNkLTZmZTI4YzViYjc0YlwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzY1MzcxNDQzfQ.cyn7fVonfE5HQqgRtsT4jIxt03aTlM-0NGcFKqH4IHiLo7dFS85KwvVLGDIMSe51kq-i6vXfRDCR_eKRpjr0YcawtYYeR-zfvs1NG-u2UlW0b-uKMKLr3ZeLz7alge3zFCHsvm0fdds1DeQTFZb0A4JulkdhKC3_ZHz2-f-uCNRR6mmKuxe3ynYJT8HZx_D7xzjDlly8vo3u1IaQoGK0QDCO57WA0n58vJWijjC5FvBZpTb_EbguCpkXxQsOFD1xXzRJAG-Bn8Ivp5XMfEvMwhhrPD3OF6ZH7KpB-oFitb4X3SDEX9u0EjJamtYhC51qiTlQpZ3zrDehl_2PbGu4qA
```

### SendGrid Email (Add these)
```bash
SENDGRID_API_KEY=SG.your-api-key-here
SENDGRID_FROM_EMAIL=noreply@jythk.com  # or your verified email
CONTACT_EMAIL_TO=your-email@example.com  # where you receive notifications
```

### Make Sure:
- ✅ ALL variables have ALL environments checked (Production, Preview, Development)
- ✅ WIX_API_KEY contains entity ID starting with `53174576`
- ✅ No duplicate variables
- ✅ No extra spaces in variable values

---

## 🎯 Success Checklist

After completing all steps, verify:

### Google OAuth:
- [ ] Redirect URLs added to Wix OAuth settings
- [ ] Can access https://jythk.vercel.app/login
- [ ] "Continue with Google" button works
- [ ] Redirects to Google sign-in page
- [ ] After login, redirects back to site
- [ ] Profile icon/name appears in top right corner

### SendGrid:
- [ ] SendGrid account created (free plan)
- [ ] API key generated and saved
- [ ] Sender email verified (single sender OR domain)
- [ ] 3 environment variables added to Vercel
- [ ] Site redeployed successfully
- [ ] Contact form sends email to your inbox
- [ ] Partner form sends email to your inbox
- [ ] Emails visible in SendGrid Activity dashboard

### Vercel:
- [ ] All environment variables set with correct values
- [ ] All variables have ALL environments checked
- [ ] Latest deployment successful (green checkmark)
- [ ] Site loads at https://jythk.vercel.app
- [ ] No "Entity not found" errors in build logs

---

## 🐛 Troubleshooting

### Google Login Still Not Working:
- Check Wix OAuth redirect URLs are EXACT (including path)
- Clear browser cache and cookies
- Try incognito/private browsing mode
- Check browser console (F12) for errors

### SendGrid Emails Not Sending:
- Verify API key is correct (starts with `SG.`)
- Check sender email is verified in SendGrid
- Look for errors in Vercel deployment logs
- Check SendGrid Activity feed for blocked/bounced emails
- Verify all 3 environment variables are set in Vercel
- Make sure "Mail Send" permission is enabled for API key

### DNS Records Not Verifying:
- Wait 15-30 minutes for DNS propagation
- Use online DNS checker: https://mxtoolbox.com/DNSLookup.aspx
- Make sure record names don't include your domain twice (e.g., `em1234` not `em1234.jythk.com.jythk.com`)
- Contact Wix support if records won't save

---

## 📞 Need Help?

Send screenshots of:
1. Wix OAuth redirect URL settings
2. SendGrid sender verification status
3. Vercel environment variables (hide sensitive values)
4. Any error messages from browser console or Vercel logs
