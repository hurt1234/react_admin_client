import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

import { Layout } from 'antd';


import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/Header'
import Nav from '../../components/Nav'
import Home from './home'
import User from './user'
import Category from './category'
import Product from './product/Product'
import Role from './role'
import Bar from './charts/Bar'
import Line from './charts/Line'
import Pie from './charts/Pie'



import './admin.less'
const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  componentDidMount() {
    if(!memoryUtils.user) {
      this.props.history.replace('/login')
      }
  }

  render() {

    return (
      <Layout className="admin">
      <Sider><Nav></Nav></Sider>
      <Layout>
        <Header/>
        <Content className="content">
          <Switch>
          <Redirect exact from='/' to='/home'/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
          </Switch>
        </Content>
        <Footer className="footer">推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
    )
  }
}
