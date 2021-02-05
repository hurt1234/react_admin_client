import  request from './request'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE = "http://120.55.193.14:5000"
//登录
export function reqLogin(username, password) {
  return request(BASE+'/login',{username,password},"POST")
}
//请求天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject)=>{
    const url  = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=ec554735fd3d8f8a31bb9480cc645f93&output=JSon`
    jsonp(url,{},(err,data)=>{
      if(!err) {
         const {temperature, weather, city  } = data.lives[0]
        resolve({temperature, weather, city  })
      }else {
        message.error("天气信息获取失败")
      }
    })
  })
}
/* reqWeather(140222) */
//获取一级、二级分列表
export const reqCategorys = parentId => request(BASE+'/manage/category/list',{parentId})
//添加分类
export const reqAddCategory = (categoryName, parentId) => request(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')
//更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => request(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')
//获取一个分类
export const reqCategory = categoryId => request(BASE + '/manage/category/info',{categoryId})
//获取商品
export const reqProducts = (pageNum, pageSize) => request(BASE + '/manage/product/list', {pageNum, pageSize})
/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => request(BASE + "/manage/product/search",{
  pageNum,
  pageSize,
  //这里的键是 变量searchType的值
  [searchType]:searchName
})
// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => request(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')
/*
删除图片
*/
export const reqDeleteImg = (name) => request(BASE + '/manage/img/delete', {name}, 'POST')
/*
提交商品添加更新
*/
export const reqAddOrUpdateProduct = (product) => request(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')

/*
拉取角色列表 */
export const reqRoles = () => request(BASE + '/manage/role/list')
/*
添加角色的方法 */
export  const reqAddRole = (roleName) => request(BASE + '/manage/role/add', {roleName}, 'POST')
// 更新角色
export const reqUpdateRole = (role) => request(BASE + '/manage/role/update', role, 'POST')
/*获取用户列表的方法 */
export const reqUsers = () => request(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => request(BASE + '/manage/user/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => request(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')