const fs = require('fs')
const path = require('path')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const redisStore = require('connect-redis')(session)
const rotatingLogStream = require('file-stream-rotator')
const morgan = require('morgan')
const cors = require('cors')


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

//解析cookie
app.use(cookieParser())


// 导入路由文件
const routes = require('./src/server/routes/index')
app.use('/', routes)


//session存储在redis中
// const { redisClient } = require('./src/server/database/redis')
// const sessionStore = new redisStore({
//   client: redisClient
// })


// 建立websocket链接
io.on('connection', function(socket) {
  // 接收客户端传递来的数据
  socket.on('login', function(data) {
    console.log(data)
    // 发送数据到客户端
    setTimeout(() => {
      socket.emit('resultInfo', {
        message: '我是后端返回的数据',
        code: 200
      })
    }, 5000)
  })
})

// 设置session
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




http.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})