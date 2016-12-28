"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = difference;
function difference(oldArr, newArr) {
  var diff = [];
  oldArr.forEach(function (item) {
    return newArr.includes(item) || diff.push(item);
  });
  return diff;
}