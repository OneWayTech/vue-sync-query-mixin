import typeOf from './typeof'

/**
 * @param  {Object} distDesc
 * @param  {Object} srcObj
 * @return {Object} distDesc
 */
function mergeDesc(distDesc, srcDesc) {
  for (let k in srcDesc) {
    let v = srcDesc[k]
    if (!distDesc[k]) distDesc[k] = {}

    switch (typeOf(v)) {
      case 'object':
        mergeDesc(distDesc[k], v)
        break
      case 'function':
        distDesc[k].formatter = v
        break
      default:
        distDesc[k] = v
        break
    }
  }
  return distDesc
}

export default mergeDesc
