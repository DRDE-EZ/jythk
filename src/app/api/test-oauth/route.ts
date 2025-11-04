import { NextRequest, NextResponse } from 'next/server';
import { getServerWixClient, makeAuthenticatedRequest } from '@/lib/wix-client-official';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing OAuth token with official Wix SDK...');
    
    // Create authenticated client
    const client = getServerWixClient();
    
    // Test fetching products
    const productsResult = await makeAuthenticatedRequest(client, async () => {
      return await client.products.queryProducts().limit(5).find();
    });
    
    // Test fetching collections
    const collectionsResult = await makeAuthenticatedRequest(client, async () => {
      return await client.collections.queryCollections().limit(5).find();
    });
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      oauth_status: 'valid',
      data: {
        products: {
          total: productsResult.totalCount || 0,
          items: productsResult.items?.length || 0,
          sample: productsResult.items?.slice(0, 2).map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.priceData?.price
          })) || []
        },
        collections: {
          total: collectionsResult.totalCount || 0,
          items: collectionsResult.items?.length || 0,
          sample: collectionsResult.items?.slice(0, 2).map((c: any) => ({
            id: c.id,
            name: c.name,
            description: c.description
          })) || []
        }
      },
      client_info: {
        client_id: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        api_key_length: process.env.WIX_API_KEY?.length || 0,
        api_key_prefix: process.env.WIX_API_KEY?.substring(0, 20) + '...'
      }
    };
    
    console.log('✅ OAuth test successful:', response);
    
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('❌ OAuth test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString(),
      oauth_status: 'invalid',
      stack: error.stack
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    const client = getServerWixClient();
    
    if (action === 'create_test_product') {
      // Test creating a product
      const newProduct = await makeAuthenticatedRequest(client, async () => {
        return await client.products.createProduct({
          name: `Test Product ${Date.now()}`,
          productType: 'physical',
          priceData: {
            price: 19.99,
            currency: 'USD'
          },
          visible: true,
          description: 'Created via OAuth API test'
        });
      });
      
      return NextResponse.json({
        success: true,
        action: 'create_product',
        product: {
          id: newProduct.product?.id,
          name: newProduct.product?.name,
          price: newProduct.product?.priceData?.price
        }
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Unknown action'
    }, { status: 400 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      action: 'post_request'
    }, { status: 500 });
  }
}