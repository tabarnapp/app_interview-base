const debug = tdebug(`${APP_ID}:hide_adminbar`);

/*
  * @param oprator {Object}  could be jQuery or zepto , jQuery by default
*/
export const hide_shopify_adminbar = function(operator) {

  debug("hide_shopify_adminbar");

  const removeShopifyAdminBar = function() {
    debug('DOMContentLoaded');
    try {
      const element = document.getElementById('admin_bar_iframe');
      const html = document.getElementsByTagName('html')[0];
      element.parentNode.removeChild(element);
      html.style.paddingTop = '0';
    } catch(ex) {

    }
  };

  // check if domcontentloaded is fired
  const states = [ 'complete', 'loaded', 'interactive' ];
  if ( states.indexOf(document.readyState) > -1 ) {
    removeShopifyAdminBar();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      removeShopifyAdminBar();
    });
  }

  function removeShopifyAdminBarHeights() {
    const jq = jQuery || operator;
    jq('[style="top: 40px;"]').css('top', '');
  }
  removeShopifyAdminBarHeights();
};
