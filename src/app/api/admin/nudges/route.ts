import { NextRequest, NextResponse } from 'next/server';
import { getWixServerClient } from '@/lib/wix-client-server';
import { getLoggedInMember } from '@/wix-api/members';

// Super admin and admin emails
const SUPER_ADMIN_EMAILS = [
  'bernarddawson22@gmail.com',
  'super@formex.com',
  'superadmin@gmail.com'
];

const ADMIN_EMAILS = [
  ...SUPER_ADMIN_EMAILS,
  'admin@formex.com',
  'admin@gmail.com'
];

// Nudge configuration interface
interface NudgeConfig {
  id: string;
  type: 'low_stock' | 'abandoned_cart' | 'new_product' | 'reorder_reminder' | 'welcome';
  title: string;
  description: string;
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
  emailSubject: string;
  emailBody: string;
  targetAudience: 'all' | 'customers' | 'new_customers' | 'inactive_customers';
  lastSent?: string;
  totalSent?: number;
}

// Default nudge configurations
const DEFAULT_NUDGES: NudgeConfig[] = [
  {
    id: 'low-stock-alert',
    type: 'low_stock',
    title: 'Low Stock Alert',
    description: 'Notify customers when their favorite items are running low',
    enabled: true,
    frequency: 'immediate',
    emailSubject: 'Hurry! {{product_name}} is running low in stock',
    emailBody: 'Hi {{customer_name}},\n\nWe noticed that {{product_name}} is one of your favorites. We currently have limited stock remaining.\n\nOrder now to avoid missing out!\n\nBest regards,\nJingyuntong Hong Kong',
    targetAudience: 'customers',
    totalSent: 0
  },
  {
    id: 'abandoned-cart',
    type: 'abandoned_cart',
    title: 'Abandoned Cart Reminder',
    description: 'Remind customers about items left in their cart',
    enabled: true,
    frequency: 'daily',
    emailSubject: 'You left items in your cart',
    emailBody: 'Hi {{customer_name}},\n\nYou have {{cart_count}} items waiting in your cart.\n\nComplete your order today and get free shipping on orders over $100!\n\nBest regards,\nJingyuntong Hong Kong',
    targetAudience: 'all',
    totalSent: 0
  },
  {
    id: 'new-product',
    type: 'new_product',
    title: 'New Product Announcement',
    description: 'Notify customers about new products in their category',
    enabled: false,
    frequency: 'weekly',
    emailSubject: 'New products just arrived!',
    emailBody: 'Hi {{customer_name}},\n\nWe just added new products that you might be interested in.\n\nCheck out our latest arrivals!\n\nBest regards,\nJingyuntong Hong Kong',
    targetAudience: 'customers',
    totalSent: 0
  },
  {
    id: 'reorder-reminder',
    type: 'reorder_reminder',
    title: 'Reorder Reminder',
    description: 'Suggest reordering based on purchase history',
    enabled: true,
    frequency: 'monthly',
    emailSubject: 'Time to restock?',
    emailBody: 'Hi {{customer_name}},\n\nBased on your previous orders, you might be running low on some supplies.\n\nReorder now and save 10% with code RESTOCK10\n\nBest regards,\nJingyuntong Hong Kong',
    targetAudience: 'customers',
    totalSent: 0
  },
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Welcome Email',
    description: 'Welcome new customers to your store',
    enabled: true,
    frequency: 'immediate',
    emailSubject: 'Welcome to Jingyuntong Hong Kong!',
    emailBody: 'Hi {{customer_name}},\n\nThank you for joining Jingyuntong Hong Kong!\n\nEnjoy 15% off your first order with code WELCOME15\n\nBest regards,\nThe JYT HK Team',
    targetAudience: 'new_customers',
    totalSent: 0
  }
];

// In-memory storage (replace with Wix Data or Site Properties in production)
let nudgesConfig: NudgeConfig[] = [...DEFAULT_NUDGES];

// Helper to check admin access
async function isAdmin(wixClient: any): Promise<boolean> {
  try {
    const loggedInMember = await getLoggedInMember(wixClient);
    if (!loggedInMember || !loggedInMember.loginEmail) return false;
    const userEmail = loggedInMember.loginEmail.toLowerCase().trim();
    return ADMIN_EMAILS.includes(userEmail);
  } catch (error) {
    return false;
  }
}

// GET: Fetch all nudges
export async function GET(request: NextRequest) {
  try {
    const wixClient = await getWixServerClient();
    const hasAccess = await isAdmin(wixClient);

    if (!hasAccess) {
      return NextResponse.json({ 
        error: 'Unauthorized' 
      }, { status: 403 });
    }

    return NextResponse.json({
      nudges: nudgesConfig,
      totalNudges: nudgesConfig.length,
      enabledNudges: nudgesConfig.filter(n => n.enabled).length
    });

  } catch (error) {
    console.error('Error fetching nudges:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch nudges'
    }, { status: 500 });
  }
}

// POST: Update nudge configuration
export async function POST(request: NextRequest) {
  try {
    const wixClient = await getWixServerClient();
    const hasAccess = await isAdmin(wixClient);

    if (!hasAccess) {
      return NextResponse.json({ 
        error: 'Unauthorized' 
      }, { status: 403 });
    }

    const body = await request.json();
    const { action, nudgeId, updates } = body;

    if (action === 'update') {
      const nudgeIndex = nudgesConfig.findIndex(n => n.id === nudgeId);
      
      if (nudgeIndex === -1) {
        return NextResponse.json({ 
          error: 'Nudge not found' 
        }, { status: 404 });
      }

      // Update nudge configuration
      nudgesConfig[nudgeIndex] = {
        ...nudgesConfig[nudgeIndex],
        ...updates
      };

      console.log(`✅ Nudge updated: ${nudgeId}`);

      return NextResponse.json({
        success: true,
        message: 'Nudge updated successfully',
        nudge: nudgesConfig[nudgeIndex]
      });
    }

    if (action === 'toggle') {
      const nudgeIndex = nudgesConfig.findIndex(n => n.id === nudgeId);
      
      if (nudgeIndex === -1) {
        return NextResponse.json({ 
          error: 'Nudge not found' 
        }, { status: 404 });
      }

      // Toggle enabled status
      nudgesConfig[nudgeIndex].enabled = !nudgesConfig[nudgeIndex].enabled;

      console.log(`✅ Nudge toggled: ${nudgeId} - ${nudgesConfig[nudgeIndex].enabled ? 'enabled' : 'disabled'}`);

      return NextResponse.json({
        success: true,
        message: `Nudge ${nudgesConfig[nudgeIndex].enabled ? 'enabled' : 'disabled'}`,
        nudge: nudgesConfig[nudgeIndex]
      });
    }

    if (action === 'reset') {
      // Reset to defaults
      nudgesConfig = [...DEFAULT_NUDGES];

      console.log('✅ Nudges reset to defaults');

      return NextResponse.json({
        success: true,
        message: 'Nudges reset to defaults',
        nudges: nudgesConfig
      });
    }

    return NextResponse.json({ 
      error: 'Invalid action' 
    }, { status: 400 });

  } catch (error) {
    console.error('Error updating nudge:', error);
    return NextResponse.json({ 
      error: 'Failed to update nudge'
    }, { status: 500 });
  }
}
