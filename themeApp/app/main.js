//here is where you will write the theme app code
//it will probably have a start funciton like runApp();
const debug = tdebug(`${APP_ID}:main`);
debug("Loading started");


import {
  loadAssets
} from 'CommonLib/load_assets.js';
import { change_our_jquery, skip_loading_jquery } from "CommonLib/jquery.js";
import * as RestAPI from "./RestAPI.js";

loadAssets([{
    type: 'script',
    url: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js",
    skip: function() {
      const dont_skip = (typeof(_) === 'undefined' || typeof(_.invoke) === 'undefined' || typeof(_.concat) === 'undefined' || (_ && _.VERSION < "4.17.4"));
      debug("loadAssets, need to skip lodash", !dont_skip);
      return !dont_skip;
    },
  },
  {
    type: 'script',
    url: "https://code.jquery.com/jquery-2.2.4.min.js",
    skip: function() {
      debug("loadAssets, need to skip jquery", skip_loading_jquery);
      return skip_loading_jquery;
    },
  },
  {
    type: 'script',
    url: "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.15.0/sweetalert2.min.js",
    skip: function() {
      const skipping_swal = (window.swal || {}).version >= "7.15.0";
      debug("[loadAssets] skippping swal", skipping_swal);
      return skipping_swal;
    },
  },
  {
    type: 'css',
    url: "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.15.0/sweetalert2.min.css"
  },

]).then(() => {
  //restore original jquery if we loaded a newer version
  if (!skip_loading_jquery) {
    change_our_jquery(window.$);
    window.$.noConflict(true);
  }
  debug("assets were loaded, downloading data now");
  RestAPI.init().then(()=>{
    runApp();
  });
  
});


const runApp = function() {
    debug("runApp with data",RestAPI.data);
}