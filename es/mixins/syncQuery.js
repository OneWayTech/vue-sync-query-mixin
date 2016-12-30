'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueUpdateQueryMixin = require('vue-update-query-mixin');

var _vueUpdateQueryMixin2 = _interopRequireDefault(_vueUpdateQueryMixin);

var _difference = require('../utils/difference');

var _difference2 = _interopRequireDefault(_difference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  mixins: [_vueUpdateQueryMixin2.default],

  data: function data() {
    return { syncQueryFields_: [] };
  },
  watch: {
    '$route.query': function $routeQuery(curQuery, oldQuery) {
      var missingKeys = (0, _difference2.default)(Object.keys(oldQuery), Object.keys(curQuery));
      this.syncQuery(missingKeys);
    }
  },
  methods: {
    _init: function _init() {
      var specialFields = [];
      for (var origField in this.$data) {
        if (!origField.endsWith('$')) continue;

        var field = origField.replace(/\$$/, '');
        specialFields.push(field);
        this._cache(origField, field);
        this._watch(origField, field);
      }
      this.syncQueryFields_ = specialFields;
    },
    _cache: function _cache(origField, field) {
      this.$data['$' + field] = this[origField];
    },
    _restore: function _restore(origField, field) {
      this[origField] = this.$data['$' + field];
    },
    _watch: function _watch(origField, field) {
      this.$watch(origField, function (v, oldV) {
        if ('' + v === '' + oldV) return;

        this.updateQuery(_defineProperty({}, field, v));
      });
    },
    syncQuery: function syncQuery(missingKeys) {
      var _this = this;

      if (!missingKeys) this._init();

      var query = this.$route.query;

      this.syncQueryFields_.forEach(function (field) {
        var origField = field + '$';

        query[field] && (_this[origField] = query[field]);
        missingKeys && missingKeys.includes(field) && _this._restore(origField, field);
      });
    }
  }
};