const { connection } = require('../db/db.js')

// 查询博客文章列表
const getListData = () => {
  let SQL = `select * from blogList`
  connection.query(SQL, (err, result) => {
    if (err) {
      
    }
  })
  // return selectSql(SQL)
}
// 删除某篇博客
const removeItem = (id) => {
  let SQL = `delete from blogList where id = ${id}`

  // return selectSql(SQL).then(removeData => {
  //   if (removeData.affectedRows > 0) {
  //     return true
  //   }
  //   return false
  // })
}
//编辑博客文章
const editItem = (id, title, content) => {
  let SQL = `update bloglist set title = ${title}, content = ${content} where id = ${id}`
  return selectSql(SQL).then(data => {
    if (data.affectedRows > 1) {
      return true
    } else {
      return false
    }
  })
}
module.exports = {
  getListData,
  removeItem,
  editItem
}
