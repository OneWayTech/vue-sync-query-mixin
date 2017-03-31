var webpack = require('webpack');

module.exports = {
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  },
  output: {
    library: 'VueSyncQuery',
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
