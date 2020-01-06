const env = process.env.NODE_ENV // 环境参数

let MYSQL
let REDIS

if (env === 'development') {
  // 数据库环境配置
  MYSQL = {
    host: '127.0.0.1' ,
    user: 'root',
    password: 'rongfa',
    port: 3306,
    database: 'blogData',
    connectTimeout: 6000, // 连接超时
    multipleStatements: false // 允许执行多条语句
  }
  // redis环境配置
  REDIS = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // 数据库环境配置
  MYSQL = {
    host: '127.0.0.1',
    user: 'root',
    password: 'rongfa',
    port: 3306,
    database: 'blogData',
    connectTimeout: 6000, // 连接超时
    multipleStatements: false // 允许执行多条语句
  }
  // redis环境配置
  REDIS = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL,
  REDIS
}