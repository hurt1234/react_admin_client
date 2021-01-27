import  request from './request'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE = "http://120.55.193.14:5000"
//登录
export function reqLogin(username, password) {
  return request(BASE+'/login',{username,password},"POST")
}

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