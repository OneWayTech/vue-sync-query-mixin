import updateQuery from 'vue-update-query-mixin'
import difference from '../utils/difference'
/**
 * Convention: Fields sync with $route.query must end with `$`
 * Usage: invoke `this.syncQuery()` in `ready` hook
 *
 * P.S. [local state <==(sync)== query string], type is string
 */
export default {
  mixins: [updateQuery],
  // Notice: fields starts with `$` or `_` will not be observable
  // since Vue regard these vars as private properties
  data: () => ({ syncQueryFields_: [] }),
  watch: {
    '$route.query' (curQuery, oldQuery) {
      const missingKeys = difference(
        Object.keys(oldQuery),
        Object.keys(curQuery)
      )
      this.syncQuery(missingKeys)
    }
  },
  methods: {
    _init () {
      let specialFields = []
      for (let origField in this.$data) {
        if (!origField.endsWith('$')) continue

        var field = origField.replace(/\$$/, '')
        specialFields.push(field)
        this._cache(origField, field)
        this._watch(origField, field)
      }
      this.syncQueryFields_ = specialFields
    },
    // cache default value (e.g. `limit$` defaults 5, `$limit` caches 5)
    _cache (origField, field) {
      this.$data[`$${field}`] = this[origField]
    },
    _restore(origField, field) {
      this[origField] = this.$data[`$${field}`]
    },
    _watch (origField, field) {
      this.$watch(origField, function (v, oldV) {
        if ('' + v === '' + oldV) return
        // local state ==(sync)==> query string
        this.updateQuery({ [field]: v })
      })
    },
    syncQuery (missingKeys) {
      if (!missingKeys) this._init()
      
      const { query } = this.$route
      this.syncQueryFields_.forEach(field => {
        var origField = `${field}$`
        // local state <==(sync)== query string
        query[field] && (this[origField] = query[field])
        missingKeys && missingKeys.includes(field) && this._restore(origField, field)
      })
    }
  }
}
