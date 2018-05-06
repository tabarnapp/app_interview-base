import "./home.html";

Template.page_home.onCreated(function(){
    this.api_result = new ReactiveVar(false);

});
Template.page_home.events({
    "click .js-example-api-call":function(e,t){
        Meteor.call("example-api-call",(error,result)=>{
            console.log(result,error);
            if (!error){
                t.api_result.set(result);
            } else {
                t.api_result.set(error);
            }
        });
    }
})

Template.page_home.helpers({
    "api_result":function(){
        const api_result =  Template.instance().api_result.get();
        if (api_result){
            return JSON.stringify(api_result, null, 2)
        } else {
            return false;
        }
    }
});