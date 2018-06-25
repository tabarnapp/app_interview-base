const debug = tdebug(`${APP_ID}:load_assets`);

const defaultCheck = function({ type, src }) {
  debug("defaultCheck", type, src);
  return false;
};


const loadScript = function() {
  const that = this;
  return new Promise((resolve, reject) => {
    const no_check = that.check === undefined && that.skip === undefined;

    const checked_def = (no_check && !defaultCheck({ type: "script", src: that.url }));
    const checked_func = (typeof that.check === "function" && that.check());
    const skip_func = (typeof that.skip === "function" && that.skip());
    const checked_val = (that.check !== undefined && !that.check);

    if (checked_func || !skip_func || checked_val || checked_def) {
      const url = that.url;
      var script = document.createElement("script");
      script.type = "text/javascript";
      if (that.integrity) {
        script.integrity = that.integrity;
      }
      if (that.crossorigin) {
        script.crossOrigin = "anonymous";
      }

      if (script.readyState) { //IE
        script.onreadystatechange = function() {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            debug('Script loaded ', url);
            if (that.afterLoad && typeof that.afterLoad === "function") {
              try {
                that.afterLoad({ skipped: false });
              } catch (e) {}
            }
            resolve();
          }
        };
      } else { //Others
        script.onload = function() {
          debug('Script loaded ', url);
          if (that.afterLoad && typeof that.afterLoad === "function") {
            try {
              that.afterLoad({ skipped: false });
            } catch (e) {}
          }
          resolve();
        };
      }
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      if (that.afterLoad && typeof that.afterLoad === "function") {
        try {
          that.afterLoad({ skipped: true });
        } catch (e) {}
      }
      resolve();
    }
  });
};

const loadStyles = function() {
  const that = this;
  const url = that.url;
  const checked_func = (typeof that.check === "function" && that.check());
  const skip_func = (typeof that.skip === "function" && that.skip()) && true;


  return new Promise((resolve, reject) => {

    if (checked_func || !skip_func) {
      var script = document.createElement("link");
      script.type = "text/css";
      script.rel = "stylesheet";

      if (script.readyState) { //IE
        script.onreadystatechange = function() {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            debug('Styles loaded ', url);
            if (that.afterLoad && typeof that.afterLoad === "function") {
              try {
                that.afterLoad({ skipped: true });
              } catch (e) {}
            }
            resolve();
          }
        };
      } else { //Others
        script.onload = function() {
          if (that.afterLoad && typeof that.afterLoad === "function") {
            try {
              that.afterLoad({ skipped: true });
            } catch (e) {}
          }
          resolve();
        };
      }

      script.href = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      //we skipped the loading of style
      if (that.afterLoad && typeof that.afterLoad === "function") {
        try {
          that.afterLoad({ skipped: true });
        } catch (e) {}
      }
      resolve();
    }
  });
};

export const loadAssets = function(assets) {
  debug("loading_assets", assets);
  return assets.map((asset) => {
    if (asset.type === 'css' || asset.type === 'style' || asset.type === 'stylesheet') {
      return loadStyles.bind({ url: asset.url, check: asset.check, skip: asset.skip, afterLoad: asset.afterLoad });
    } else if (asset.type === 'script') {
      //added asset.skip and kept check for backward compatibility
      //skip makes more sense when thinking about this, if skip = true don't load, check always messes with my tought process
      return loadScript.bind({ url: asset.url, check: asset.check, skip: asset.skip, integrity: asset.integrity, crossorigin: asset.crossorigin, afterLoad: asset.afterLoad });
    } else {
      throw Error('UnknowAssetType', 'Asset has to be of type css or script');
    }
  }).reduce((previous, current) => {
    return previous.then(current);
  }, Promise.resolve());
};