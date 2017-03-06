'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueUpdateQueryMixin = require('vue-update-query-mixin');

var _vueUpdateQueryMixin2 = _interopRequireDefault(_vueUpdateQueryMixin);

var _objectify = require('../utils/objectify');

var _objectify2 = _interopRequireDefault(_objectify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  mixins: [_vueUpdateQueryMixin2.default],
  methods: {
    syncQuery: function syncQuery(fieldsMap) {
      if (!fieldsMap) throw new Error('syncQuery accepted an empty value');
      fieldsMap = (0, _objectify2.default)(fieldsMap);
      for (var localField in fieldsMap) {
        var queryField = fieldsMap(localField);
        this._local2query(localField, queryField);
        this._query2local(queryField, localField);
      }
    },
    _local2query: function _local2query(localField, queryField) {
      this._backup(localField);
      this.$watch(localField, function (v) {
        this.updateQuery(_defineProperty({}, queryField, v));
      });
    },
    _query2local: function _query2local(queryField, localField) {
      this.$watch('$route.query.' + queryField, function (v) {
        v ? this[localField] = v : this._restore(localField);
      });
    },
    _backup: function _backup(localField) {
      this.$data['$' + localField] = this[localField];
    },
    _restore: function _restore(localField) {
      this[localField] = this.$data['$' + localField];
    }
  }
};