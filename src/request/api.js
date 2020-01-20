import { get, post } from '../request/http.js'

// 登录
export const getuser = params => post('api/login', params)
// 获取用户登录信息
export const userinfo = params => get('api/userinfo', params)
// 获取博客列表
export const gethomelist = params => get('api/searchlist', params)
// 删除文章
export const removeitem = params => post('api/removelist', params)
// 编辑博客
export const editblog = params => post('api/editarticle', params)
// 查询博客文章
export const searchlist = params => post('api/articlelist', params)
//创建博客
export const addarticle = params => post('api/addarticle', params)
// 获取博客文章详情
export const getblogdetail = params => post('api/blogdetail',params)
// 分页列表
export const pagelist = params => post('api/pagelist', params)
// 图片上传
export const uploadImg = params => post('api/upload', params)