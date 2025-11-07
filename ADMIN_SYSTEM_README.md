# Production-Ready Admin System

## Overview

This is a production-ready admin management system that doesn't rely on hardcoded emails. Instead, it uses an API-based approach where the first person to set up the system becomes the Super Administrator.

## Features

✅ **First-Time Setup Wizard** - Easy initialization process
✅ **API-Based Management** - No hardcoded admin emails
✅ **Role-Based Access Control** - Super Admin and Admin roles
✅ **Secure Authentication** - Google OAuth integration
✅ **Dynamic Admin Management** - Add/remove admins through UI
✅ **Caching System** - Fast role checks with smart caching

## Setup Process

### 1. First-Time Admin Setup

When deploying to production for the first time:

1. Navigate to: `https://your-domain.com/admin-setup-wizard`
2. Click "Sign in with Google"
3. The first person to sign in becomes the **Super Administrator**
4. After initialization, you'll be redirected to the admin dashboard

### 2. Adding Additional Admins

As a Super Admin, you can add more administrators:

1. Go to Admin Dashboard
2. Navigate to "Admin Management" section
3. Enter the new admin's email address
4. Choose role: Admin or Super Admin
5. Click "Add Admin"

### 3. Admin Roles

**Super Administrator:**
- Full system access
- Can add/remove other admins
- Can promote admins to super admin
- Cannot be removed by regular admins

**Administrator:**
- Access to admin dashboard
- Can manage customers and orders
- Can view analytics
- Cannot manage other admins

**Customer:**
- Standard user access
- No admin privileges

## API Endpoints

### `/api/admin-config`

**GET Actions:**
- `?action=check&email=...` - Check if email is an admin
- `?action=list` - Get all admins (super admin only)
- `?action=status` - Check if system is initialized

**POST Actions:**
- `action: initialize` - First-time setup (creates first super admin)
- `action: add` - Add new admin (requires authentication)
- `action: remove` - Remove admin (requires authentication)

## File Structure

```
src/
├── app/
│   ├── admin-setup-wizard/
│   │   └── page.tsx              # Setup wizard UI
│   ├── admin-dashboard/
│   │   └── page.tsx              # Main admin dashboard
│   └── api/
│       └── admin-config/
│           └── route.ts          # Admin management API
├── lib/
│   ├── admin-config.ts           # Legacy (localStorage-based)
│   └── admin-config-v2.ts        # Production (API-based)
```

## Security Considerations

### Current Implementation (Development)
- Admins stored in memory (resets on server restart)
- Good for development and testing

### Production Recommendations

**Replace in-memory storage with:**

1. **Database Storage (Recommended)**
   ```typescript
   // Use MongoDB, PostgreSQL, or your preferred database
   import { db } from '@/lib/database';
   
   export async function GET(req) {
     const admins = await db.admins.find();
     // ...
   }
   ```

2. **Redis Cache**
   ```typescript
   import redis from '@/lib/redis';
   
   const admins = await redis.get('admin:list');
   ```

3. **Environment Variables** (for initial setup)
   ```env
   INITIAL_SUPER_ADMIN=admin@yourcompany.com
   ```

### Authentication

Currently using:
- **Google OAuth** via Wix authentication
- **Session-based** auth with HTTP-only cookies

Additional recommendations:
- Add rate limiting to admin endpoints
- Implement audit logging for admin actions
- Add 2FA for super admin accounts
- Use JWT tokens with short expiration

## Migration from Legacy System

If you have existing admins in the old system (localStorage):

1. Export current admin emails from localStorage
2. Use the API to add them to the new system:

```javascript
// Run this in browser console while logged in as super admin
const oldAdmins = JSON.parse(localStorage.getItem('adminEmails') || '[]');

for (const email of oldAdmins) {
  await fetch('/api/admin-config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      action: 'add', 
      email, 
      role: 'admin' 
    })
  });
}
```

## Environment Variables

```env
# Required
NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id
NEXT_PUBLIC_WIX_SITE_ID=your_wix_site_id
WIX_API_KEY=your_wix_api_key

# Optional (for initial admin)
INITIAL_SUPER_ADMIN=admin@yourcompany.com

# Database (when you add it)
DATABASE_URL=your_database_connection_string
```

## Usage in Code

```typescript
import { checkAdminRoleAsync, isAdminAsync, addAdminEmail } from '@/lib/admin-config-v2';

// Check if user is admin (async)
const role = await checkAdminRoleAsync('user@example.com');
if (role === 'super_admin') {
  // Super admin actions
}

// Quick check (uses cache)
const isAdmin = await isAdminAsync('user@example.com');

// Add new admin
const success = await addAdminEmail('newadmin@example.com', 'admin');
```

## Deployment Checklist

- [ ] Set up admin setup wizard route (`/admin-setup-wizard`)
- [ ] Configure Google OAuth properly
- [ ] Add database for persistent admin storage
- [ ] Set up environment variables
- [ ] Test first-time initialization
- [ ] Test admin management features
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup system for admin data
- [ ] Document admin onboarding process

## Support

For issues or questions:
1. Check the console logs for detailed error messages
2. Verify Google OAuth is configured correctly
3. Ensure API endpoints are accessible
4. Check database connections (if using database)

## Future Enhancements

- [ ] Email invitations for new admins
- [ ] Admin activity audit log
- [ ] Two-factor authentication
- [ ] Role permissions customization
- [ ] Admin approval workflow
- [ ] Bulk admin management
- [ ] Admin analytics dashboard
