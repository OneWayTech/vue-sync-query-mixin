import updateQuery from 'vue-update-query-mixin'
import objectify from '../utils/objectify'

export default {
  mixins: [updateQuery],
  methods: {
    syncQuery (fieldsMap) {
      if (!fieldsMap) throw new Error('syncQuery accepted an empty value')
      fieldsMap = objectify(fieldsMap)
      for (let localField in fieldsMap) {
        const queryField = fieldsMap(localField)
        this._local2query(localField, queryField)
        this._query2local(queryField, localField)
      }
    },
    _local2query (localField, queryField) {
      this._backup(localField)
      this.$watch(localField, function (v) {
        this.updateQuery({ [queryField]: v })
      })
    },
    _query2local (queryField, localField) {
      this.$watch(`$route.query.${queryField}`, function (v) {
        // P.S. local state <==(sync)== query string, type is string
        v ? this[localField] = v : this._restore(localField)
      })
    },
    // backup the default value (e.g. `limit` defaults to 5, so `$limit` caches 5)
    _backup (localField) {
      this.$data[`$${localField}`] = this[localField]
    },
    _restore(localField) {
      this[localField] = this.$data[`$${localField}`]
    }
  }
}
