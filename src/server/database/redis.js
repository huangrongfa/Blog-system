const redis = require('redis')
const { REDIS } = require('../config/config')

// 链接redis
const redisClient = redis.createClient(REDIS)

// 设置redis
function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
}

// 获取redis
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, val) => {
      if (error) {
        reject(error)
        return false
      }
      if (val == null) {
        resolve(null)
        return false
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

redisClient.on('error', error => {
  console.log(`redis--------------------连接失败`)
})
redisClient.on('ready', res => {
  console.log(`redis-------------------连接成功`)
})

module.exports = {
  set,
  get,
  redisClient
}