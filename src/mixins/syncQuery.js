import updateQuery from 'vue-update-query-mixin'
import typeOf from '../utils/typeof'
import mergeDesc from '../utils/mergeDesc'
const err = msg => { throw new Error('[SyncQuery] ' + msg) }

export default {
  mixins: [updateQuery],
  methods: {
    syncQuery (fields) {
      if (!fields) err('empty fields')
      switch (typeOf(fields)) {
        case 'string':
          this._syncQuery(defaultDescGen(fields))
          break
        case 'object':
          this._syncQuery(mergeDesc(defaultDescGen(fields.localField), fields))
          break
        case 'array':
          fields.forEach(field => this.syncQuery(field))
          break
        default:
          err('invalid type of field')
      }
    },
    _syncQuery ({ localField, queryField, local2query, query2local }) {
      (() => {
        // backup the default value
        const defaultVal = this[localField]
        
        // local ==(sync)==> query
        this.$watch(localField, function (v, oldV) {
          this.updateQuery({ [queryField]: local2query.formatter(v, oldV) })
        }, local2query)

        // local <==(sync)== query
        this.$watch(`$route.query.${queryField}`, function (v, oldV) {
          this[localField] = query2local.formatter(v, oldV) || defaultVal
        }, query2local)
      })()
    }
  }
}

/**
 * default descriptor generator for $watch
 * @param  {String} field
 * @return {Object}
 */
function defaultDescGen(field) {
  return {
    localField: field,
    queryField: field,
    local2query: {
      formatter: v => v,
      immediate: false,
      deep: false
    },
    query2local: {
      formatter: v => v,
      immediate: true,
      deep: false // P.S. watching deep of a string makes no sense
    }
  }
}
