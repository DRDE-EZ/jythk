import { products } from '@wix/stores';
import { createClient, OAuthStrategy } from '@wix/sdk';

// Direct Wix client using the OAuth strategy with your provided client ID
export function createDirectWixClient() {
  return createClient({
    modules: { products },
    auth: OAuthStrategy({ 
      clientId: '8ddda745-5ec1-49f1-ab74-5cc13da5c94f' 
    }),
  });
}

// Function to fetch products using the direct client
export async function getProductsDirectly() {
  try {
    const myWixClient = createDirectWixClient();
    const productList = await myWixClient.products.queryProducts().find();

    console.log('My Products:');
    console.log('Total: ', productList.items.length);
    console.log(productList.items
      .map((item) => item.name)
      .join('\n')
    );

    return {
      success: true,
      total: productList.items.length,
      products: productList.items,
      names: productList.items.map((item) => item.name)
    };
  } catch (error) {
    console.error('Error fetching products directly:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: errorMessage,
      total: 0,
      products: [],
      names: []
    };
  }
}