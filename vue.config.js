const path = require('path')
const isProduction = process.env.NODE_ENV == 'production'


module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: '8080',
    host: 'localhost',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/api': '/api'
        },
        changeOrigin: true
      }
    },
  },
  css: {
    extract: true,
    sourceMap: false,
    modules: false
  }
}