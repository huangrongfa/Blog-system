const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rongfa',
  port: '3306',
  database: 'blogData',
  connectTimeout: 6000, // 连接超时
  multipleStatements: true // 允许执行多条语句
})

// 链接数据库
connection.connect()

module.exports = {
  connection
}

// 执行sql语句
/* function selectSql(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return false
      }
      resolve(result)
    })
  })
  return promise
}
module.exports = {
  selectSql
} */