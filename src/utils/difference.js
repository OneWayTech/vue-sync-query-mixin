/**
 * simple implementation of lodash's _.difference
 * @param  {Array} oldArr
 * @param  {Array} newArr
 * @return {Array} diff
 */
export default function difference(oldArr, newArr) {
  let diff = []
  oldArr.forEach(item => newArr.includes(item) || diff.push(item))
  return diff
}

/**
 * e.g.
 * difference([1, 2, 3, 4, 5], [1, 3, 5]) => [2, 4]
 */
