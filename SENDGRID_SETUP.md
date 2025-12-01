# SendGrid Email Setup Instructions

## Step 1: Create SendGrid Account (FREE)

1. Go to https://signup.sendgrid.com/
2. Sign up for a free account (100 emails/day free forever)
3. Verify your email address

## Step 2: Create API Key

1. Go to https://app.sendgrid.com/settings/api_keys
2. Click "Create API Key"
3. Name it: `jythk-forms`
4. Select "Full Access" or "Mail Send" access
5. Click "Create & View"
6. **COPY THE API KEY** (you can only see it once!)

## Step 3: Verify Sender Email

1. Go to https://app.sendgrid.com/settings/sender_auth/senders
2. Click "Create New Sender"
3. Fill in your details:
   - **From Email**: Your business email (e.g., contact@jythk.com or your Gmail)
   - **From Name**: Jingyuntong Hong Kong
   - **Reply To**: Same as above
   - Address, City, Country: Your business info
4. Click "Create"
5. **Check your email and verify** the sender address

## Step 4: Add to Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project: **jythk**
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:

   **Variable 1:**
   - Name: `SENDGRID_API_KEY`
   - Value: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (paste the key you copied)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 2:**
   - Name: `SENDGRID_FROM_EMAIL`
   - Value: `contact@jythk.com` (or whatever email you verified in SendGrid)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 3:**
   - Name: `CONTACT_EMAIL_TO`
   - Value: `your-email@gmail.com` (where you want to receive form submissions)
   - Environments: ✅ Production ✅ Preview ✅ Development

5. Click **Save** for each variable

## Step 5: Redeploy

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

## Step 6: Test

1. Go to your site: https://jythk.vercel.app/contact
2. Fill out the contact form
3. Submit it
4. **Check your email inbox** - you should receive a nicely formatted email!

---

## ✅ What You Get:

- **Instant email notifications** for every form submission
- **Beautiful HTML emails** with all the form data
- **Reply-to feature** - just hit reply to respond to the customer
- **Separate emails** for contact forms and partnership inquiries
- **100 emails/day FREE** (upgradable if needed)

---

## 📧 Email Examples:

### Contact Form Email:
```
Subject: 🔔 New Contact Form: [Subject from form]

New Contact Form Submission

From: John Doe
Email: john@example.com
Phone: +1234567890
Subject: Quote for 50MW Solar Farm

Message:
[Customer's message here]
```

### Partnership Form Email:
```
Subject: 🤝 New Partnership Inquiry: Rooftop Installation

New Partnership Inquiry

Name: Jane Smith
Email: jane@example.com
Location: Hong Kong
Interest: Rooftop Installation

Additional Information:
[Additional details here]
```

---

## 🔧 Troubleshooting:

**If emails don't arrive:**
1. Check spam/junk folder
2. Verify sender email in SendGrid is verified (green checkmark)
3. Check Vercel environment variables are set correctly
4. Check SendGrid Activity Feed: https://app.sendgrid.com/activity

**Test SendGrid is working:**
- Visit: https://jythk.vercel.app/test-login
- Check browser console for any SendGrid errors
