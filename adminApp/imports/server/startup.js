SSL(process.env.PWD+'/private/localhost.key',process.env.PWD+'/private/localhost.crt', 3100);
import {register_script_tags,register_webhooks} from "./on_install";

Meteor.startup(function () {
    register_script_tags();
    register_webhooks();
});