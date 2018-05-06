
import * as DefImport  from "shopify-api-node";
const Shopify = DefImport.default;

const API_KEY = 'API_KEY';
const API_SECRET = 'API_PASSWORD';
const API_SHOP_DOMAIN = 'mystore.myshopify.com';
 

export const shopify = new Shopify({
    shopName: API_SHOP_DOMAIN,
    apiKey: API_KEY,
    password: API_SECRET
  });