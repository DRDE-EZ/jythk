const { createClient, ApiKeyStrategy } = require('@wix/sdk');
const { products, collections } = require('@wix/stores');

// Manual environment variables from .env file
const WIX_API_KEY = "IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImQ2ZGEwZGZmLWExYzEtNDc2My1iNzJmLTNmMDYxMTUxMmQzNlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImIyMTg2NmRiLWU4NjItNDM5NC04MDI2LWZmNzA3YzI3YjIxZVwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIzMGYwM2NlZC1jZjc4LTQ1ZjYtOTMxMS0yZjQxYmMzNGE3M2ZcIn19IiwiaWF0IjoxNzYxMTUwNzA4fQ.dktz1mD2SoaNwmzGkhjieqPDzjaNaOwSxzr7QeJ3Cr4sqts5NKs9QkkBoS5RXEMlRMUDzvgePIKTH0LKBXVDzqXvyS5KT6U21_J1baJoxl5A8VM6oiz7AKxzkjWP2vokoJX156USQfE8KVMSLplU6sTtxYgeJMoisH87y9iAf7NmNMSG3odUrPwoRB-LcYd2n44TBIVT_noKQJ_TYAyzH1PzJ-q9Aw3s4DmSgchb0tbodkWCWAVTmhUSOVxASF1GWhwOR4reJvTQNyQsQfzmjH1n87jCa7oVDE5qvFlmlHIFT7sBinxzn4kE6aRvbR5-dssLMgj0pIg_lvOC3rfAEg";
const SITE_ID = "4b296c48-4a6b-4db1-9813-d74e37a5e3ea";
const CLIENT_ID = "cbf77863-cedf-4588-b7a8-fc430cf6a816";

const wixClient = createClient({
  modules: {
    products,
    collections,
  },
  auth: ApiKeyStrategy({
    apiKey: WIX_API_KEY,
    siteId: SITE_ID,
  }),
});

async function testWixAPI() {
  console.log('🔍 Testing Wix API connection...');
  console.log('Site ID:', SITE_ID);
  console.log('Client ID:', CLIENT_ID);
  console.log('API Key exists:', !!WIX_API_KEY);
  console.log('---');

  try {
    // Test Collections
    console.log('📂 Testing Collections...');
    const collectionsResult = await wixClient.collections
      .queryCollections()
      .find();
    
    console.log(`Found ${collectionsResult.items.length} collections:`);
    collectionsResult.items.forEach((collection, index) => {
      console.log(`  ${index + 1}. ${collection.name} (${collection.numberOfProducts || 0} products)`);
      console.log(`     Slug: ${collection.slug}`);
      console.log(`     Visible: ${collection.visible}`);
      console.log(`     Has Media: ${collection.media?.items?.length > 0 ? 'Yes' : 'No'}`);
    });
    console.log('---');

    // Test Products
    console.log('🛍️ Testing Products...');
    const productsResult = await wixClient.products
      .queryProducts()
      .limit(10)
      .find();
    
    console.log(`Found ${productsResult.items.length} products:`);
    productsResult.items.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name}`);
      console.log(`     Slug: ${product.slug}`);
      console.log(`     Price: ${product.priceData?.formatted?.price || 'No price'}`);
      console.log(`     Visible: ${product.visible}`);
      console.log(`     In Stock: ${product.stock?.inStock ? 'Yes' : 'No'}`);
    });

  } catch (error) {
    console.error('❌ Error testing Wix API:');
    console.error('Error message:', error.message);
    console.error('Error details:', error);
  }
}

testWixAPI();