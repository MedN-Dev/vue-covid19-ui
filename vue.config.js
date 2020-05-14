const path = require('path') // eslint-disable-line
const { version } = require('./package.json') // eslint-disable-line

// https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
process.env.VUE_APP_VERSION = version

module.exports = {
  devServer: {
    https: true
  },
  publicPath: process.env.VUE_APP_TARGET_PUBLIC_PATH || '',
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue$: path.resolve(
          __dirname,
          'node_modules/vue/dist/vue.runtime.esm.js'
        ),
        '^vuetify': path.resolve(__dirname, 'node_modules/vuetify')
      }
    }
  }
}
