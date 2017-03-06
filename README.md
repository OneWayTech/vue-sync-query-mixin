# Vue sync-query mixin

> v1.x see branch `v1`

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

```js
// This is a Vue component
import syncQuery from 'vue-sync-query-mixin'

export default {
  mixins: [syncQuery],
  data: () => ({ limit: 10, offset: 0 }),
  ready () {
    this.syncQuery(['limit', 'offset'])
    // `limit` will keep in sync with `$route.query.limit`
    // `offset` will keep in sync with `$route.query.offset`
  }
}
```

`syncQuery` accepts 3 types of argument:

* `string`, e.g. `syncQuery('limit') // limit will keep in sync with $route.query.limit`
* `array`, see example above
* `object`, e.g. `syncQuery({ limit: 'limitBy' }) // limit will keep in sync with $route.query.limitBy`

### Notice

* `local state <==(sync)== query string`, the type is `string`

### Build

`npm run build`

[npm-url]: https://www.npmjs.com/package/vue-sync-query-mixin
[npm-v-img]: http://img.shields.io/npm/v/vue-sync-query-mixin.svg
[npm-dl-img]: http://img.shields.io/npm/dm/vue-sync-query-mixin.svg
