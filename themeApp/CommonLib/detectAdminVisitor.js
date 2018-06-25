export let isAdmin = !!document.getElementById('admin_bar_iframe');

export const checkAdmin = function(){
  isAdmin = !!document.getElementById('admin_bar_iframe');
};
