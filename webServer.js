const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const redisStore = require('connect-redis')(session)
const rotatingLogStream = require('file-stream-rotator')
const morgan = require('morgan')
const cors = require('cors')

// 导入路由文件
const router = require('./src/server/router/router')
app.use(router)

// 设置允许跨域
app.use(cors())

// 写入日志文件到本地
let logDirectory = path.join(__dirname, './src/server/logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
let accesslog = rotatingLogStream.getStream({
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  verbose: false,
  frequency: 'daily',
  date_format: 'YYYY-MM-DD',
  size: '2M'
})
app.use(morgan('combined', { stream: accesslog }))

// 解析post提交数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())


const { redisClient } = require('./src/server/database/redis')

//session存储在redis中
// const sessionStore = new redisStore({
//   client: redisClient
// })

let randomStr = Math.random().toString(36).substr(2)
app.use(session({
  secret: randomStr, // 生成随机字符串
  saveUninitialized: true, // session在使用过程中被修改
  cookie: {
    path: '/', // 默认配置 
    maxAge: 60 * 60 * 1000, // 设置30分钟
    httpOnly: true, // 默认配置
  },
  resave: true, // 允许重新设置session
  // store: sessionStore
}))

app.listen(9000, () => {
  console.log('Server is running at http://localhost:9000')
})