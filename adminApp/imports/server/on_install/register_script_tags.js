import {shopify} from "../api.js";
import {_} from "lodash";

export const register_script_tags = ()=>{
    shopify.scriptTag.list({
        src:"https://localhost:3100/themeScripts/build/app_base_interview.js"
    }).then((result)=>{
        if (result.length === 0){
            shopify.scriptTag.create({
                "event": "onload",
                "src": "https://localhost:3100/themeScripts/build/app_base_interview.js"
            });
        }
    });
}