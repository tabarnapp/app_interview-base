import { initialize } from "./jquery.initialize.js";

let $jq = window.$ || {};
const skip_loading_jquery = (((window.$ || {}).fn || {}).jquery || "0.0.0") >= "2.2.4";


if (skip_loading_jquery) {
  initialize($jq);
}

const change_our_jquery = function(new_jquery) {
  $jq = new_jquery;
  initialize($jq);
};

export { $jq as $, change_our_jquery, skip_loading_jquery };