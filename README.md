# Vue sync-query mixin

> `vue-sync-query-mixin@1.x` see branch `v1`

[![npm version][npm-v-img]][npm-url]
[![npm download][npm-dl-img]][npm-url]

> Effortlessly keep local state and `$route.query` in sync for Vue 1.x | Vue 2.x  
> Intellectual property of [Oneway.mobi](http://www.oneway.mobi/)

### Requirement
* Vue 1.x | 2.x
* Vue Router 0.7.x | 2.x

### Installation
`npm i vue-sync-query-mixin -S`

alternatively：`<script src="dist/vue-sync-query-mixin.min.js"></script>`  
which exposes **`VueSyncQuery`** as a global variable

### Example
Vue 1.x online example is [here](https://kenberkeley.github.io/vue-sync-query-mixin/example-vue1.html) (source code is [`./example-vue1.html`](./example-vue1.html))  
Vue 2.x online example is [here](https://kenberkeley.github.io/vue-sync-query-mixin/example-vue2.html) (source code is [`./example-vue2.html`](./example-vue2.html))  

### Usage
```js
// This is a Vue component
import syncQuery from 'vue-sync-query-mixin'

export default {
  mixins: [syncQuery],
  data: () => ({ limit: 10 }),
  ready () {
    // `limit` will keep in sync with `$route.query.limit`
    this.syncQuery('limit')
  }
  // Vue 1.x can use beforeCompile/compiled/ready
  // Vue 2.x can use created/beforeMount/mounted
}
```

`syncQuery` accepts 4 types of argument:

* `string|string[]`

```js
this.syncQuery('limit')
this.syncQuery(['limit'])
```

* `object|object[]`

```js
this.syncQuery({
  localField: 'limit',
  queryField: 'limit',
  local2query: {
    formatter: v => v,
    immediate: false,
    deep: false
  },
  query2local: {
    formatter: v => v,
    immediate: true,
    deep: false
  }
})
this.syncQuery([
  {
    localField: 'limit',
    queryField: 'limit',
    local2query: {
      formatter: v => v,
      immediate: false,
      deep: false
    },
    query2local: {
      formatter: v => v,
      immediate: true,
      deep: false
    }
  }
])
```

### Magic

> More detail in [source code](./src/mixins/syncQuery.js)  
> Vue.js official `vm.$watch( expOrFn, callback, [options] )` API documentation is [here](https://cn.vuejs.org/v2/api/#vm-watch)

```js
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
```

### Notice
* `local <==(sync)== query`, default type is `string`, or else you need to write `formatter` yourself
* default `local2query` and `query2local` shown as below:

```js
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
```

But they can be `function` type, and then we regard them as the `formatter`  
What's more, all the options are `merge` not `override`, for example:

```js
syncQuery({
  localField: 'limit',
  queryField: 'limit',
  local2query: { immediate: true },
  query2local: v => +v // string to number
})

// ↑ is same as ↓

syncQuery({
  localField: field,
  queryField: field,
  local2query: {
    formatter: v => v,
    immediate: true, // merge!
    deep: false
  },
  query2local: {
    formatter: v => +v, // merge!
    immediate: true,
    deep: false
  }
})
```

### Build
`npm run build`

[npm-url]: https://www.npmjs.com/package/vue-sync-query-mixin
[npm-v-img]: http://img.shields.io/npm/v/vue-sync-query-mixin.svg
[npm-dl-img]: http://img.shields.io/npm/dm/vue-sync-query-mixin.svg
