import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import "/imports/client/ui/pages/dashboard";
import "/imports/client/ui/layout";

FlowRouter.route('/settings', {
    name: 'app.settings',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', {  main: 'page_settings' });
    },
  });
  

FlowRouter.route('/settings/affiliate', {
    name: 'app.settings.affiliate',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', {  main: 'page_affiliate' });
    },
  });
  
  
FlowRouter.route('/settings/credits', {
    name: 'app.settings.credits',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', {  main: 'page_credits' });
    },
  });
  
  
FlowRouter.route('/settings/tour', {
    name: 'app.settings.tour',
    // subscriptions: function(params, queryParams) {
    //   this.register('users.all', Meteor.subscribe('users.all'));
    // },
    action() {
      BlazeLayout.render('layout_default', {  main: 'page_tour' });
    },
  });
  
  