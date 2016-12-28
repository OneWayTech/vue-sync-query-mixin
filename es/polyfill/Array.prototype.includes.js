"use strict";

Array.prototype.includes = Array.prototype.includes || function (item) {
  return this.indexOf(item) !== -1;
};