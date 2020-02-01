'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = require('./typeof');

var _typeof2 = _interopRequireDefault(_typeof);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeDesc(distDesc, srcDesc) {
  for (var k in srcDesc) {
    var v = srcDesc[k];
    if (!distDesc[k]) distDesc[k] = {};

    switch ((0, _typeof2.default)(v)) {
      case 'object':
        mergeDesc(distDesc[k], v);
        break;
      case 'function':
        distDesc[k].formatter = v;
        break;
      default:
        distDesc[k] = v;
        break;
    }
  }
  return distDesc;
}

exports.default = mergeDesc;