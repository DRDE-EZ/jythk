import { NextResponse } from "next/server";

export async function GET() {
  // Return HTML that does client-side role check and redirect
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Verifying your access...</title>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top: 4px solid white;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    h2 {
      margin: 0 0 10px;
      font-size: 28px;
      font-weight: 600;
    }
    p {
      margin: 0;
      opacity: 0.9;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="spinner"></div>
    <h2>Verifying your access</h2>
    <p>Please wait a moment...</p>
  </div>
  
  <script>
    (async function() {
      try {
        // Import enhanced auth
        const { enhancedAuth } = await import('/src/lib/enhanced-auth.ts');
        
        console.log('🔍 Checking user role...');
        
        // Get current member
        const currentMember = await enhancedAuth.getCurrentMember();
        
        if (!currentMember || !currentMember.member) {
          console.log('❌ No member found, redirecting to customer dashboard');
          window.location.href = '/customer-dashboard-protected';
          return;
        }
        
        // Extract email
        const memberData = currentMember.member;
        const userEmail = memberData.loginEmail || memberData.contact?.emails?.[0] || '';
        
        console.log('✅ User email:', userEmail);
        
        if (!userEmail || !userEmail.includes('@')) {
          console.log('❌ Invalid email, redirecting to customer dashboard');
          window.location.href = '/customer-dashboard-protected';
          return;
        }
        
        // Check if admin (hardcoded list for client-side)
        const admins = [
          'admin@formex.com',
          'super@formex.com',
          'admin@gmail.com',
          'superadmin@gmail.com',
          'bernarddawson22@gmail.com'
        ];
        
        const normalizedEmail = userEmail.toLowerCase().trim();
        const isAdmin = admins.includes(normalizedEmail);
        
        console.log('🔍 Is admin?', isAdmin);
        
        // Redirect based on role
        if (isAdmin) {
          console.log('✅ Admin user - redirecting to admin dashboard');
          window.location.href = '/admin-dashboard';
        } else {
          console.log('👤 Regular user - redirecting to customer dashboard');
          window.location.href = '/customer-dashboard-protected';
        }
      } catch (error) {
        console.error('❌ Role check failed:', error);
        // Default to customer dashboard on error
        window.location.href = '/customer-dashboard-protected';
      }
    })();
  </script>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
