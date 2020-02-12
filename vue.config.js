const path = require('path')
const isProduction = process.env.NODE_ENV == 'production'


module.exports = {
  outputDir: 'dist', // 项目打包生成目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  runtimeCompiler: true,
  lintOnSave: false,
  productionSourceMap: false, // 是否生产SourceMap文件
  chainWebpack: () => {
    if (isProduction) {
      // 生产环境的配置
    } else {
      // 开发环境的配置
    }
  },
  configureWebpack: (config) => {
    Object.assign(config, {
      resolve: {
        //设置路径别名
        alias: {
          '@': path.resolve(__dirname, './src')
        }
      }
    })
  },
  devServer: {
    port: '8080',
    host: 'localhost',
    open: true, // 自动打开浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { // 路径重写
          '^/api': '/api'
        },
        changeOrigin: true // 允许跨域
      }
    },
    hotOnly: true // 开启热更新
  },
  css: {
    extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件
    sourceMap: false, // 
    modules: false
  },
  // 是否启用dll
  parallel: require('os').cpus().length > 1,
}