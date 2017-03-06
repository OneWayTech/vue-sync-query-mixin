'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = objectify;

var _typeof = require('./typeof');

var _typeof2 = _interopRequireDefault(_typeof);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function objectify(v) {
  var type = (0, _typeof2.default)(v);

  switch (type) {
    case 'string':
      return str2obj(v);
    case 'array':
      return arr2obj(v);
    case 'object':
      return v;
    default:
      throw new Error('Invalid arg type');
  }
}

function str2obj(str) {
  return _defineProperty({}, str, str);
}

function arr2obj(arr) {
  var obj = {};
  arr.forEach(function (item) {
    return obj[item] = item;
  });
  return obj;
}