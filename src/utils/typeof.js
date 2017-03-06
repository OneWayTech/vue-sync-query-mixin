const toString = Object.prototype.toString

/**
 * A better `typeof`
 * @param  {Any}    any
 * @return {String} type name
 */
export default function typeOf(any) {
  return toString.call(any).slice(8, -1).toLowerCase()
}
