
import {
  getQueryParams
} from './getQueryParams.js';

export const check_plugin = function(check="start_selection") {
  const qp = getQueryParams();
  return !!qp[check];
};
