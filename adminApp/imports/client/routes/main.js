import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import "/imports/client/ui/pages/dashboard";
import "/imports/client/ui/layout";

FlowRouter.route('/', {
    name: 'app.home',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', { main: 'page_settings' });
    },
  });
