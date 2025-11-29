import { NextResponse } from 'next/server';
import { getWixServerClient } from '@/lib/wix-client-server';
import { getLoggedInMember } from '@/wix-api/members';

// Super admin emails
const SUPER_ADMIN_EMAILS = [
  'bernarddawson22@gmail.com',
  'super@formex.com',
  'superadmin@gmail.com'
];

// Admin emails
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

    // Fetch all products from Wix (max 100 per request)
    const productsResponse = await (wixClient.products as any)
      .queryProducts()
      .limit(100)
      .find();

    const products: any[] = productsResponse.items || [];
    const totalProducts = products.length;

    // Find low stock products (less than 10 units)
    const lowStockProducts = products
      .filter((product: any) => {
        const quantity = product.stock?.quantity || 0;
        return product.stock?.trackQuantity && quantity < 10;
      })
      .map((product: any) => ({
        _id: product._id,
        name: product.name,
        stock: {
          quantity: product.stock?.quantity || 0
        }
      }));

    return NextResponse.json({
      totalProducts,
      lowStockProducts
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch products',
      totalProducts: 0,
      lowStockProducts: []
    }, { status: 500 });
  }
}
