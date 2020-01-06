const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const redisStore = require('connect-redis')(session)
const rotatingLogStream = require('file-stream-rotator')
const morgan = require('morgan')

// 写入日志文件到本地
let logDirectory = path.join(__dirname, './src/server/logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

let accesslog = rotatingLogStream.getStream({
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  verbose: false,
  frequency: 'daily',
  date_format: 'YYYY-MM-DD',
  size: '5M'
})
app.use(morgan('combined', {stream: accesslog})) 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser()) // 设置cookie中间件

const { connection } = require('./src/server/database/mysql')
const { redisClient } = require('./src/server/database/redis')

//session存储在redis中
const sessionStore = new redisStore({
  client: redisClient
})

let randomStr = Math.random().toString(36).substr(2)
app.use(session({
  secret: randomStr, // 生成随机字符串
  saveUninitialized: true, // session在使用过程中被修改
  cookie: {
    path: '/', // 默认配置 
    maxAge: 30 * 60 * 1000, // 设置30分钟
    httpOnly: true, // 默认配置
  },
  resave: true, // 允许重新设置session
  store: sessionStore
}))




//用户登录
app.post('/api/login', function (req, res, next) {
  let { username, password } = req.body
  let userinfo = {
    name: 'rongfa',
    password: 666666
  }
  if (username == userinfo.name && password === '666666') {
    // res.cookie('username', username, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true})
    req.session.username = { username, password: 666666 }
    return res.json({
      code: 200,
      msg: '登录成功'
    })
  } else {
    return res.json({
      code: -1,
      msg: '用户名或密码错误'
    })
  }
})

// 获取用户登录信息
app.post('/api/userinfo', function (req, res, next) {
  if (req.session.username !== null) {
    req.username = req.session.username
  }
  return res.json({
    code: 200,
    data: req.username
  })
})
// 退出登录
app.get('/api/logout', function (req, res, next) {
  req.session.username = null
})

// 获取博客列表
app.get('/api/searchlist', function (req, res, next) {
  let sql = `select * from blogList`
  connection.query(sql, (error, result) => {
    if (error) {
      return res.json({
        code: 1,
        data: '暂无数据',
        affectedRows: 0
      })
    } else {
      return res.json({
        code: 200,
        data: result,
        affectedRows: result.affectedRows
      })
    }
  })
})
// 删除博客
app.post('/api/removelist', function (req, res, next) {
  let id = req.body.id
  let sql = `DELETE FROM blogList where id = ${id}`
  connection.query(sql, (error, result) => {
    if (result.affectedRows > 0) {
      return res.json({
        code: 200,
        meassge: '删除成功'
      })
    } else {
      return res.json({
        code: 1,
        meassge: '删除失败'
      })
    }
  })
})
// 查询博客文章
app.post('/api/articlelist', function (req, res, next) {
  let id = req.body.id
  let sql = `SELECT * FROM blogList where id = ${id}`
  connection.query(sql, (error, result) => {
    if (error) {
      return res.json({
        code: -1,
        meassge: '灰常抱歉，没有你查找的数据！'
      })
    }
    res.json({
      code: 200,
      data: result,
      affextedRows: result.affextedRows
    })
  })
})
// 创建博客
app.post('/api/addarticle', function (req, res, next) {
  let blogList = req.body
  let sql = `INSERT INTO blogList SET ?`
  connection.query(sql, blogList, (error, result) => {
    if (error) {
      return res.json({
        code: -1,
        meassage: '创建失败'
      })
    }
    res.json({
      code: 200,
      meassage: '创建成功'
    })
  })
})
// 编辑博客
app.post('/api/editarticle', function (req, res, next) {
  let sql = `UPDATE blogList SET title = ?,content = ? WHERE id = ${req.body.id}`
  let resultdata = [req.body.title, req.body.content]
  connection.query(sql, resultdata, (error, result) => {
    if (error) {
      return res.json({
        code: -1,
        meassge: '更新失败'
      })
    }
    res.json({
      code: 200,
      meassge: '更新成功'
    })
  })
})
// 获取博客文章详情
app.post('/api/blogdetail', function (req, res, next) {
  let id = req.body.id
  let sql = `SELECT * FROM blogList where id = ${id}`
  connection.query(sql, (error, result) => {
    if (error) {
      return res.json({
        code: -1,
        meassage: '获取详情失败'
      })
    }
    res.json({
      code: 200,
      data: result
    })
  })
})
// 分页接口
app.post('/api/pagelist', function (req, res, next) {
  let currentPage = req.body.currentPage // 当前页数
  let start = (currentPage - 1) * 6
  let sql = `select * from blogList limit ${start}, 6 `
  connection.query(sql, (error, result) => {
    if (error) {
      return res.json({
        code: -1,
        meassge: '失败'
      })
    }
    return res.json({
      msg: '成功',
      code: 200,
      data: result
    })
  })
})

app.listen(9000, () => {
  console.log('Server is running at http://localhost:9000')
})