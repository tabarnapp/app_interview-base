# setup
1. go to adminApp/private and generate localhost ceritifiucates by running the command below
```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

2. make sure you have webpack-cli intalled 
3. make sure you have tmux installed
4. go to adminApp and run `meteor npm i`
5. go to themeApp and run `npm i` 
6. start the project with `./start.sh`. It will open 2 tabs one for the meteor app, one for the themeApp. You can switch between tabs by pressing ctrl+b 1 and ctrl+b 2



# general info
1.  Generate your private api keys (described [here](https://help.shopify.com/api/getting-started/api-credentials#generate-private-api-credentials)). Make sure you select all possible permissions so you wan't have to come back and edit later.
2.  Set your api keys in `/imports/server/api.js`
3.  Get accustomed with the libraries used:

*   Shopify API Docs implemented with [shopify-api-node](https://www.npmjs.com/package/shopify-api-node) npm package.
*   [Uptown.css](https://www.uptowncss.com/) (frontend library)

5.  **DO NOT use** autoform packages
6.  Use lodash rather than underscore
7.  If you bind a class to a javascript function always prepend `js-` to the class name and never attach any css to it. Look at the example button below for a demo.