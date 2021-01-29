import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { reqWeather } from "../../api/index";
import memoryUtils from '../../utils/memoryUtils'
import { formateDate } from '../../utils/dateUtils'

import storageUtils from '../../utils/storageUtils.js'

import './header.less'

const { confirm } = Modal;
class Header extends Component {
  state = {
    username: memoryUtils.user?memoryUtils.user.username:"" ,
    time: ""
  }
  exit = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确认退出？",
      onOk: () => {
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace("/login")

      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  async componentDidMount() {
    const data = await reqWeather(140222)
    this.setState(
      data
    )
    /* this.timerId =  setInterval(() => {
       let time = formateDate(new Date())
       this.setState({time})
     }, 1000); */
  }
  /*  componentWillUnmount() {
     clearInterval(this.timerId)
   } */
  render() {
    let title;
    const path = this.props.location.pathname;
    switch (path) {
      case '/home':
        title = "首页"
        break;
      case '/product':
        title = "商品管理"
        break;
      case '/category':
        title = "品类管理"
        break;
      case '/user':
        title = "用户管理"
        break;
      case '/role':
        title = "角色管理"
        break;
      case '/charts/bar':
        title = "柱形图"
        break;
      case '/charts/line':
        title = "折线图"
        break;
      case '/charts/pie':
        title = "饼图"
        break;
    }
    return (
      <div className="header">
        <div className="top">
          <span>欢迎，{this.state.username}</span>
          <span className="exit" onClick={this.exit}>退出</span>
        </div>
        <div className="under">
          <div className="left">{title}</div>
          <div className="right">
            <span>{this.state.time} </span>
            <span>{this.state.city}</span>
            <span className="mid">温度:{this.state.temperature}度</span>
            <span>天气:{this.state.weather}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)