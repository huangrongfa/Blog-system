// const { connection } = require('../db/db.js')

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
  editItem
}
