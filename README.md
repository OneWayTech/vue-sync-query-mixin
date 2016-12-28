# Vue sync-query mixin

[![npm version][npm-v-img]][npm-url]
[![npm download][npm-dl-img]][npm-url]

> Effortlessly keep local state and `$route.query` in sync for Vue 1.x  
> Intellectual property of [Oneway.mobi](http://www.oneway.mobi/)

### Requirement
* Vue 1.x
* Vue Router 0.7.x

### Installation

`npm i vue-sync-query-mixin -S`

alternatively：  
`<script src="dist/vue-sync-query-mixin.min.js"></script>`

### Usage

**Convention**: fields end with `$` would be set to keep in sync with `$route.query`

```js
// This is a Vue component
import syncQuery from 'vue-sync-query-mixin'

export default {
  mixins: [syncQuery],
  // local state
  data: () => ({
    hello: 'world', // just a ordinary field
    foo$: 'bar'     // will keep in sync with `$route.query.foo`
  }),
  ready () {
    this.syncQuery() // start watching changes to sync...
  }
}
```

### Notice

* `local state <==(sync)== query string`, the type is `string`
* we use the same field names (but start with `$`) to cache the default values  
e.g. (see the example above)  
`foo$` is set to keep in sync with `$route.query.foo`, while `$foo` is used to store the default value `bar`

### Build

`npm run build`

[npm-url]: https://www.npmjs.com/package/vue-sync-query-mixin
[npm-v-img]: http://img.shields.io/npm/v/vue-sync-query-mixin.svg
[npm-dl-img]: http://img.shields.io/npm/dm/vue-sync-query-mixin.svg
