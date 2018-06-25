import {
  getQueryParams
} from './getQueryParams.js';

export const reloadWith = function(params) {
  const query = getQueryParams();
  for (let param in params) {
    if (typeof params[param] !== undefined) {
      query[param] = params[param];
    } else {
      delete query[param];
    }
  };
  let newQueryString = Object.keys(query).length > 0 ? "?" : "";
  for (let param in query) {
    if (query.hasOwnProperty(param)) {
      newQueryString = `${newQueryString}${param}=${query[param]}&`;
    }
  }
  newQueryString = newQueryString.replace(/&$/, "");
  window.location.href = location.origin + location.pathname + newQueryString;
};
