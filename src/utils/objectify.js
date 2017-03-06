import typeOf from './typeof'

export default function objectify(v) {
  const type = typeOf(v)

  switch (type) {
    case 'string':
      return str2obj(v)
    case 'array':
      return arr2obj(v)
    case 'object':
      return v
    default:
      throw new Error('Invalid arg type')
  }
}

/**
 * @param  {String} str
 * @return {Object}
 * e.g.
 * str2obj('limit') => { limit: 'limit' }
 */
function str2obj(str) {
  return { [str]: str }
}

/**
 * @param  {Array} arr
 * @return {Object}
 * e.g.
 * arr2obj(['limit', 'order']) => { limit: 'limit', order: 'order' }
 */
function arr2obj(arr) {
  const obj = {}
  arr.forEach(item => obj[item] = item)
  return obj
}
