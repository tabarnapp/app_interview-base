import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import "/imports/client/ui/pages/referers";
import "/imports/client/ui/layout";

FlowRouter.route('/referers', {
    name: 'app.referers.list',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', {  main: 'page_referers' });
    },
  });
  

FlowRouter.route('/referers/detail/:id', {
    name: 'app.referers.single',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', {  main: 'page_referer_detail' });
    },
  });
  