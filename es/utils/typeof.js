"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeOf;
var toString = Object.prototype.toString;

function typeOf(any) {
  return toString.call(any).slice(8, -1).toLowerCase();
}