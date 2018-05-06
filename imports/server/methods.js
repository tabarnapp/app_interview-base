import {shopify} from "./api.js";

Meteor.methods({
    "example-api-call":function(){
        return shopify.order.list({ limit: 1 })
        .then(orders => {
            return {success:orders};
        })
        .catch(err=>{
            return {error:err};
        });
    }
})
