
//when we are using selector tool on product pages
// there are sometimes product related ids or classes
// which has to be filtered out to be able to
// use selected area on other product pages
import {
  escape
} from './CSS.escape.js';

const filter = function(selector = ''){
  const isProductPage = window.location.pathname.split('/')[1] === 'products';
  if (isProductPage) {
    const currentProductName = window.location.pathname.split('/')[2].split('-')[0];
    return selector.indexOf(currentProductName) === -1 ? selector : '';
  } else {
    return selector;
  }
};
const steps = [

  {
    importance : 1,
    name : 'getId',
    getter : (el) => {
      const el_id = filter(el.attributes ? el.attributes.id && el.attributes.id.nodeValue : '');
      return el_id ? `#${el_id}` : '';
    },
  },
  {
    importance : 0,
    name : 'getClass',
    getter : (el) => {
      const el_class =  el.className.trim().split(' ')
        .map( (element) => {
          return escape(element.trim());
        }).filter( (element) => {
          return !!element && filter(element);
        }).join('.');
      return el_class ? `.${el_class}` : '';
    }
  },
  //else get node name
  {
    importance : 2,
    name : 'getTag',
    getter : (el) => {
      return el.nodeName.toLowerCase();
    },
  }
];

const getPathElemIdentifier = (el) => {
  let selector = '', count = 0 ;
  const stepsByImportance = steps.sort((a,b) => {
    return a.importance - b.importance;
  });

  while( !selector && count < steps.length + 1 ){
    selector = stepsByImportance[count].getter(el);
    count += 1;
  }
  return selector;
};

export const getPath =  function( path ) {
// The first time this function is called, path won't be defined.
  if ( typeof path === 'undefined' ) path = [];
  // If this element is <html> we've reached the end of the path.
  if ( this.is('html') ) {
    path.splice(0,0,'html');
    return path;
  }
  if ( this.is('body') ) {
    path.splice(0,0,'body');
    return path;
  }
  const selector = getPathElemIdentifier(this.get(0));
  path.splice(0,0,selector);
  return getPath.call(this.parent(), path);
};

export const getUniqueSelector = function({ element, forceFilter = true }){
  let path =  getPath.call(element);
  path = path.join(' > ');
  window.elem = element;
  window.elem_path = path;
  window.element = element;
  window.path = path;
  console.log("path",`${path}:eq(${element.index(path)})`);
  return `${path}:eq(${element.index(path)})`;
};
