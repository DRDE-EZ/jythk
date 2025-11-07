# Admin Access Debugging Guide

## ✅ What Was Fixed

1. **Enhanced Email Detection**: Admin dashboard now tries multiple fields to extract email:
   - `loginEmail`
   - `contact.emails[0]`
   - `profile.emails[0]`
   - `email`

2. **Improved Admin Role Checking**: 
   - Normalizes emails to lowercase and trims whitespace
   - Better logging to see what's happening
   - Checks both admin and super admin lists

3. **Redirect Fix**: Google sign-in now redirects to `/admin-dashboard` instead of `/profile`

4. **Debug Test Page**: Created `/admin-test` to diagnose authentication issues

## 🧪 How to Test Admin Access

### Option 1: Use the Test Page (RECOMMENDED)

1. **Navigate to the test page**:
   ```
   http://localhost:3001/admin-test
   ```

2. **Sign in with Google** using your email: `bernarddawson22@gmail.com`

3. **Check the results**:
   - ✅ Green badge = Admin access granted
   - ❌ Red badge = No admin access
   - View "Email Detection" section to see what email was extracted
   - View "Admin Configuration" section to see if your email is in the list

4. **If your email shows but no match**:
   - Check if the email format exactly matches
   - Look at "All Email Fields Found" to see what Wix returned
   - The test page will highlight matches in green

### Option 2: Direct Admin Dashboard Access

1. **Navigate to admin dashboard**:
   ```
   http://localhost:3001/admin-dashboard
   ```

2. **Sign in with Google** using: `bernarddawson22@gmail.com`

3. **Check browser console** (F12) for detailed logs:
   ```
   🔍 DEBUG: Full member data: {...}
   📧 Extracted email: bernarddawson22@gmail.com
   🔑 Member data fields: {...}
   👤 User role check: {...}
   ```

4. **If you see "Access Denied"**:
   - Click the **"Make Me Admin"** button
   - This will add your email to localStorage admin list
   - Refresh the page

## 🔧 Troubleshooting Steps

### Issue: "Access Denied" even with correct email

**Solution 1: Use "Make Me Admin" Button**
1. Go to `/admin-dashboard`
2. Sign in with Google
3. Click "Make Me Admin" button when prompted
4. Refresh the page

**Solution 2: Clear localStorage and retry**
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh and sign in again

**Solution 3: Manually add to localStorage**
1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.setItem('adminEmails', JSON.stringify(['bernarddawson22@gmail.com']));
   localStorage.setItem('superAdminEmails', JSON.stringify(['bernarddawson22@gmail.com']));
   ```
3. Refresh the page

### Issue: Email not being extracted from Wix

**Check using test page:**
1. Go to `/admin-test`
2. Sign in
3. Look at "All Email Fields Found" section
4. If all fields are empty/null, the issue is with Wix member data

**Possible causes:**
- Google OAuth not properly configured in Wix dashboard
- Member profile incomplete
- Wix API permissions issue

### Issue: Different email being used

If Wix returns a different email than expected:

1. Note the actual email from test page
2. Add it to admin config:
   - Edit `src/lib/admin-config.ts`
   - Add the email to both arrays:
     ```typescript
     defaultAdminEmails: [
       // ... existing emails
       'actual-email@example.com',
     ],
     defaultSuperAdminEmails: [
       // ... existing emails
       'actual-email@example.com',
     ]
     ```

## 📋 Current Admin Configuration

**Super Admin Emails:**
- super@formex.com
- superadmin@gmail.com
- **bernarddawson22@gmail.com** ✅

**Regular Admin Emails:**
- admin@formex.com
- super@formex.com
- admin@gmail.com
- superadmin@gmail.com
- **bernarddawson22@gmail.com** ✅

## 🎯 Expected Behavior

When `bernarddawson22@gmail.com` signs in:

1. ✅ Should see "✅ Admin authenticated: bernarddawson22@gmail.com Role: super_admin" in console
2. ✅ Should have access to full admin dashboard
3. ✅ Should see all admin menu items including:
   - Overview
   - Admin Management
   - Notifications
   - **Supply Alerts** (NEW)
   - **Customer Nudges** (NEW)
   - Inventory
   - Customers & Suppliers
   - Revenue & Analytics

## 🔐 Security Notes

- Admin emails are stored in `admin-config.ts` with defaults
- Can be overridden via localStorage for testing
- In production, consider using database-based role management
- Super admins have all permissions
- Regular admins have limited permissions (can be configured)

## 📞 Still Having Issues?

If you're still seeing "Access Denied":

1. **Share the console logs** from browser (F12 → Console tab)
2. **Share screenshot** from `/admin-test` page
3. **Check if you're using the correct Google account**
4. **Try incognito/private browsing** to rule out cached data
5. **Verify the dev server is running** on port 3001

## 🚀 Next Steps

Once admin access is working:

1. Test all admin dashboard sections
2. Verify Supply Alerts functionality
3. Test Customer Nudges customization
4. Check if notification badges update correctly
5. Test admin management features
