const Lockr = require('lockr');

export const current_session = {};
const prefix = (typeof APP_ID !== "undefined" && APP_ID) ? APP_ID + "_" : "tabarnapp_";
const events = {};

export function get(default_key, default_value = false) {
  const key = prefix + default_key;
  const cache_object = Lockr.get(key, default_value);
  const now = new Date();
  if (cache_object && cache_object.expire && cache_object.data && cache_object.expire > now.getTime()) {
    return cache_object.data;
  }

  Lockr.rm(key);
  return current_session[default_key] || default_value;
};

export function set(key, value, expiry_minutes = 0, nobinds = false) {
  //expire is in minutes
  const new_key = prefix + key;
  const now = new Date();
  current_session[key] = value;
  const expire_date = new Date(now.getTime() + (expiry_minutes * 60000));

  Lockr.set(new_key, { expire: expire_date.getTime(), data: value });
  if (nobinds === false) {
    runBinds(key);
  }
};

export function rm(key) {
  const new_key = prefix + key;
  delete current_session[key];
  Lockr.rm(new_key);
}

export function flush() {
  for (let key in window.localStorage) {
    const cleaned_key = key.replace(prefix, '');
    if (cleaned_key !== key) {
      rm(cleaned_key);
    }
  }
}

export function runBinds(key) {
  if (events[key] && events[key].length) {
    for (let i = 0; i < events[key].length; i += 1) {
      if (typeof events[key][i] === "function") {
        events[key][i](current_session[key]);
      }
    }
  }
}

export function bind(key, callback) {
  if (!events[key]) events[key] = [];
  events[key].push(callback);
}

export function unbind(key, callback) {
  const index = (events[key] || []).indexOf(callback);
  (events[key] || []).splice(index, 1);
}