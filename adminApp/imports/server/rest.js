import {
    Picker
  } from 'meteor/meteorhacks:picker';
  import url from 'url';
  import { _ } from "lodash";
  
  
  
  Picker.route('/rest/download_data.json', (params, req, res, next) => {
  
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
  
    const query = params.query;
  
    const response = {
        ok: false
    }
  
    if (!query.shop) {
      res.end(JSON.stringify(response));
      return false;
    }
    
    response.ok = true;
    response.settings = { name: "test"};
    res.end(JSON.stringify(response));
  });