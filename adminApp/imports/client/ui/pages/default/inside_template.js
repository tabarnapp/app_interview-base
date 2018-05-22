import "./inside_template.html";
import "./inside_template.css";
import "/imports/ui/components/footer";
import {
  ShopifyPayments
} from 'meteor/bogdanrn:shopify-payments';


Template.inside_template.onCreated(function() {
  // 1. Initialization

  const that = this;

  that.ready_to_render = new ReactiveVar(false);

  // will re-run when the "limit" reactive variables changes
  that.autorun(function() {
    if (ShopifyPayments.subsReady()) {
      if (Meteor.user()) {
        that.ready_to_render.set(true);
        ShopifyApp.Bar.initialize({
          title: "Dashboard",
          icon: "/favicon.png",
          buttons: {
            secondary: [
              { label: "Help", href: "https://desk.zoho.com/portal/tabarnapp/kb/apps-and-theme/milestones-app", target: "new" },
              { label: "Dashboard", href: "/settings", target: "app" }
            ]
          }
        });
      }
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
  });

});

Template.inside_template.helpers({

  ready_to_render: function() {
    return Template.instance().ready_to_render.get();
  },
});

// Template.inside_template.events({
//   "click .js-upgrade-button": function(e, t) {
//     const l = Ladda.create(e.target);
//     if (!l.isLoading()) {
//       l.start();
//       ShopifyPayments.enforce("depends_on_sales", false);
//       return true;
//     }
//     return false;
//   }
// });