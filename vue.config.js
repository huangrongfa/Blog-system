const path = require('path')
const isProduction = process.env.NODE_ENV == 'production'


module.exports = {
  outputDir: 'dist', // 项目打包生成目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  runtimeCompiler: true,
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: '8080',
    host: 'localhost',
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: { // 路径重写
          '^/api': '/api'
        },
        changeOrigin: true // 是否改变域名
      }
    },
    hotOnly: true // 开启热更新
  },
  css: {
    extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件
    sourceMap: false, 
    modules: false
  }
}