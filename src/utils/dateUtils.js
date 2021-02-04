/*
包含n个日期时间处理的工具函数模块
*/

/*
  格式化日期
*/
export  function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear()
  let months =  date.getMonth() + 1
  let day = date.getDate()
  let hours =  date.getHours()
  let minutes =  date.getMinutes()
  let seconds = date.getSeconds()

  months = months>10?months:'0'+months
  day = day>10?day:'0'+day
  hours  = hours>10?hours:'0'+hours
  minutes = minutes>10?minutes:'0'+minutes
  seconds  = seconds>10?seconds:'0'+seconds
  return year + '-' + months + "-" + day + " " + hours + ":" + minutes + ":" + seconds


}