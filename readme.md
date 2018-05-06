1.  Generate your private api keys (described [here](https://help.shopify.com/api/getting-started/api-credentials#generate-private-api-credentials)). Make sure you select all possible permissions so you wan't have to come back and edit later.
2.  Set your api keys in `/imports/server/api.js`
3.  Get accustomed with the libraries used:

*   Shopify API Docs implemented with [shopify-api-node](https://www.npmjs.com/package/shopify-api-node) npm package.
*   [Uptown.css](https://www.uptowncss.com/) (frontend library)

5.  **DO NOT use** autoform packages
6.  Use lodash rather than underscore
7.  If you bind a class to a javascript function always prepend `js-` to the class name and never attach any css to it. Look at the example button below for a demo.