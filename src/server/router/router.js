
const express = require("express")
const router = express.Router()
const { getListData } = require('../controller/controller.js')
const { scuessModel, errorModel } = require('baseModal.js')


// 获取文章列表
router.get('/api/searchlist', function(req, res){
  const result = getListData()
  return result.then(listdata => {
    res.json(new scuessModel(listdata))
  })
})

module.exports = router