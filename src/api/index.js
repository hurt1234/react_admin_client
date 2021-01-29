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