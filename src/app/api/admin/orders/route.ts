import { NextResponse } from 'next/server';
import { getWixServerClient } from '@/lib/wix-client-server';
import { getLoggedInMember } from '@/wix-api/members';

// Super admin emails
const SUPER_ADMIN_EMAILS = [
  'bernarddawson22@gmail.com',
  'super@formex.com',
  'superadmin@gmail.com'
];

// Admin emails (can be extended via API)
const ADMIN_EMAILS = [
  ...SUPER_ADMIN_EMAILS,
  'admin@formex.com',
  'admin@gmail.com'
];

export async function GET() {
  try {
    const wixClient = await getWixServerClient();
    const loggedInMember = await getLoggedInMember(wixClient);

    if (!loggedInMember) {
      return NextResponse.json({ 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const userEmail = loggedInMember.loginEmail?.toLowerCase().trim();
    
    if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
      return NextResponse.json({ 
        error: 'Unauthorized' 
      }, { status: 403 });
    }

    // Fetch orders from Wix
    const ordersResponse = await (wixClient.orders as any).searchOrders({
      cursorPaging: {
        limit: 100 // Last 100 orders
      }
    });

    const orders: any[] = ordersResponse.orders || [];

    // Calculate stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum: number, order: any) => {
      return sum + (parseFloat(order.priceSummary?.total || '0'));
    }, 0);

    // Get unique customers
    const uniqueCustomers = new Set(
      orders.map((order: any) => order.buyerInfo?.email).filter(Boolean)
    );
    const totalCustomers = uniqueCustomers.size;

    // Get recent orders
    const recentOrders = orders
      .sort((a: any, b: any) => {
        const dateA = new Date(a._createdDate || 0).getTime();
        const dateB = new Date(b._createdDate || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 10);

    return NextResponse.json({
      totalOrders,
      totalRevenue: Math.round(totalRevenue),
      totalCustomers,
      recentOrders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch orders',
      totalOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      recentOrders: []
    }, { status: 500 });
  }
}
