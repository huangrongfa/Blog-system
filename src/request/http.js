import axios from 'axios'
import QS from 'qs'


// 区分不同的环境
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = ''
} else if(process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://www.production.com'
}

// 请求时间
axios.defaults.timeout = 10000
// 设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  // config => {

  // },
  // error => {

  // }
)

// 响应拦截器
axios.interceptors.response.use(
  // response => {
  //   if (response.status == 200) {
  //     return Promise.resolve(response)
  //   } else {
  //     return Promise.reject(response)
  //   }
  // },
  // error => {
  //   if (error.response.status) {
  //     switch (error.response.status) {
  //       case 401:
  //         alert('401')
  //         break;
  //       case 404:
  //         alert('404')
  //         break;
  //       default:
  //         alert('default')
  //         break;
  //     }
  //   }
  // }
)

//get请求方法
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

//post请求方法
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}