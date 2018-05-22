
import * as DefImport  from "shopify-api-node";
const Shopify = DefImport.default;

const API_KEY = process.env.TABARNAPP_PRIVATE_API_KEY || 'API_KEY';
const API_SECRET = process.env.TABARNAPP_PRIVATE_API_PASSWORD || 'API_PASSWORD';
const API_SHOP_DOMAIN = process.env.TABARNAPP_PRIVATE_API_SHOP || 'mystore.myshopify.com';
 
export const shopify = new Shopify({
    shopName: API_SHOP_DOMAIN,
    apiKey: API_KEY,
    password: API_SECRET
  });