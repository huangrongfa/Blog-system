const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { connection } = require('../database/mysql')

// token密钥
let secretkey = 'vrn5ifmbfsq'

// 处理图片上传
const upload = multer({ dest: "./src/server/public" })
const singleMidle = upload.single("imgurl")

//用户登录
router.post('/api/login', function (req, res, next) {
  let password = req.body.password
  let username = req.body.username
  let sql = `select * from user where username = "${username}" and password = "${password}" `
  connection.query(sql, (error, result) => {
    if (error) {
      res.send(error)
      return false
    }
    let token = jwt.sign({ username }, secretkey, { expiresIn: 60 * 60 * 24 })
    res.json({
      code: 200,
      message: '登录成功啦！',
      data: {
        token,
        data: result
      }
    })
  })
});

// 获取用户登录信息
router.get('/api/userinfo', function (req, res, next) {
  // 验证token
  let authToken = req.headers.authorization
  jwt.verify(authToken, secretkey, (error, result) => {
    if (error) {
      res.json({
        meassge: '当前用户未登录'
      })
    } else {
      res.json({
        data: {
          authToken: jwt.sign({ username: result.username }, secretkey, { expiresIn: 60 * 60 * 24 }),
          username: result.username
        }
      })
    }
  })
});
// 分页接口
router.post('/api/pagelist', function (req, res, next) {
  let currentPage = parseInt(req.body.currentPage) // 当前页数
  let start = (currentPage - 1) * 6 // 每页返回几条数据
  let sql = `select count(*) from blogList;select * from blogList limit 6 offset ${start}`
  connection.query(sql, (error, result) => {
    // connection.release()
    if (error) {
      return false
    } else {
      let all = result[0][0]['count(*)']
      let allPage = Math.ceil(parseInt(all) / 6)
      let pageStr = allPage.toString()
      if (pageStr.indexOf('.') > 0) {
        allPage = parseInt(pageStr.split('.')[0]) + 1
      }
      let dataList = result[1]
      return res.json({
        code: 200,
        data: dataList,
        totalPage: allPage
      })
    }
  })
});
// 获取文章列表
router.get('/api/searchlist', function (req, res, next) {
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
});
// 删除博客
router.post('/api/removelist', function (req, res, next) {
  let id = req.body.id
  let sql = `delete from blogList where id = ${id}`
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
});
// 退出登录
router.get('/api/logout', function (req, res, next) {
  res.json({
    code: 200,
    message: `退出成功`
  })
})
// 查询博客文章
router.post('/api/articlelist', function (req, res, next) {
  let id = req.body.id
  let sql = `select * from blogList where id = ${id}`
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
});


// 创建博客
router.post('/api/addarticle', function (req, res, next) {
  let blogList = req.body
  let sql = `insert into blogList SET ?`
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
});
// 编辑博客
router.post('/api/editarticle', function (req, res, next) {
  let sql = `update blogList set title = ?,content = ? where id = ${req.body.id}`
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
});
// 获取博客文章详情
router.post(`/api/blogdetail`, function (req, res, next) {
  let id = req.body.id
  let sql = `select * from blogList where id = ${id}`
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
});

// 图片上传
router.post('/api/upload', singleMidle, function (req, res, next) {
  console.log(req.file)
  let _imgurl = req.file.originalname
  res.json({
    code: 200,
    imgUrl: `http://localhost:9000/uploads/${_imgurl}`
  })
});

module.exports = router