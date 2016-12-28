'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _syncQuery = require('./mixins/syncQuery');

Object.keys(_syncQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _syncQuery[key];
    }
  });
});

require('./polyfill/Array.prototype.includes');

require('./polyfill/String.prototype.endsWith');