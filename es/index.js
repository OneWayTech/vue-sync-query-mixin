'use strict';

require('./polyfill/Array.prototype.includes');
require('./polyfill/String.prototype.endsWith');

module.exports = require('./mixins/syncQuery');