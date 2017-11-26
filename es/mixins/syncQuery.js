'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueUpdateQueryMixin = require('vue-update-query-mixin');

var _vueUpdateQueryMixin2 = _interopRequireDefault(_vueUpdateQueryMixin);

var _typeOf = require('../utils/typeof');

var _typeOf2 = _interopRequireDefault(_typeOf);

var _mergeDesc = require('../utils/mergeDesc');

var _mergeDesc2 = _interopRequireDefault(_mergeDesc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var err = function err(msg) {
  throw new Error('[SyncQuery] ' + msg);
};

exports.default = {
  mixins: [_vueUpdateQueryMixin2.default],
  methods: {
    syncQuery: function syncQuery(fields) {
      var _this = this;

      if (!fields) err('empty fields');
      switch ((0, _typeOf2.default)(fields)) {
        case 'string':
          this._syncQuery(defaultDescGen(fields));
          break;
        case 'object':
          this._syncQuery((0, _mergeDesc2.default)(defaultDescGen(fields.localField), fields));
          break;
        case 'array':
          fields.forEach(function (field) {
            return _this.syncQuery(field);
          });
          break;
        default:
          err('invalid type of field');
      }
    },
    _syncQuery: function _syncQuery(_ref) {
      var _this2 = this;

      var localField = _ref.localField,
          queryField = _ref.queryField,
          local2query = _ref.local2query,
          query2local = _ref.query2local;

      (function () {
        var defaultVal = _this2[localField];

        _this2.$watch(localField, function (v, oldV) {
          this.updateQuery(_defineProperty({}, queryField, local2query.formatter(v, oldV)));
        }, local2query);

        _this2.$watch('$route.query.' + queryField, function (v, oldV) {
          this[localField] = query2local.formatter(v, oldV) || defaultVal;
        }, query2local);
      })();
    }
  }
};

function defaultDescGen(field) {
  return {
    localField: field,
    queryField: field,
    local2query: {
      formatter: function formatter(v) {
        return v;
      },
      immediate: false,
      deep: false
    },
    query2local: {
      formatter: function formatter(v) {
        return v;
      },
      immediate: true,
      deep: false }
  };
}