import './default.html';
import "../lib/uptown.css";
import "../lib/custom.css";

Template.layout_default.helpers({
  "ready": function() {
    return FlowRouter.subsReady();
  }
})