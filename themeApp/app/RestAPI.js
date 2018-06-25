import { tCache } from 'CommonLib/cache';
import { Shopify } from 'CommonLib/Shopify.js';
const debug = tdebug(`${APP_ID}:RestAPI`);

export const data = {
    settings: {}
};

const download_data = function(){
    return new Promise((resolve,reject)=>{
        const cached_data = tCache.get("data",false); //default value false

        if(cached_data !== false){
            data.settings = cached_data.settings;
            debug("used cached data",data);
            resolve();
        } else {
            const now = new Date();
            request(`https://localhost:3100/rest/download_data.json?shop=${Shopify.shop}&cache_buster=${now}`, {
                json: true
              }, function(err, result) {
                if (err || result.ok !== true) {
                  reject();
                  throw err;
                }

                debug("Get json data", result);

                data.settings = result.settings;

                //save the cache for later
                tCache.set("data",data, 0); //0 minutes, disabled for dev purpose
                resolve();
            });
        }
    });
}

export const init = function() {
  const requests_to_make = [download_data()];
  return Promise.all(requests_to_make);
}