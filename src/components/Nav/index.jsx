import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu } from 'antd';
import {
  UserOutlined,
  AreaChartOutlined,
  PieChartOutlined,

  MenuUnfoldOutlined,
  MenuFoldOutlined,

  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './nav.less'

const { SubMenu } = Menu;
 class index extends Component {
  render() {
    let openGroup;
    const path = this.props.location.pathname
    if(path === '/category' || path === "/product") {
      openGroup = "sub1"
    }else if(path ==='/charts/bar' || path === "/charts/line" || path === "/charts/pie") {
      openGroup = "sub2"
    }

    return (
      <div className="nav">
        <Link className="header" to="/">
          <img src={logo} alt="" />
          <p>王者荣耀</p>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openGroup]}
          mode="inline"
          theme="dark"
        >

          <Menu.Item key="/home" icon={<ContainerOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">

            <Menu.Item key="/category" icon={<MenuFoldOutlined />}>
              <Link to="/category">品类管理</Link></Menu.Item>


            <Menu.Item key="product" icon={<MenuUnfoldOutlined />}>
              <Link to="/product">商品管理</Link></Menu.Item>


          </SubMenu>

          <Menu.Item key="/user" icon={<UserOutlined />}>
            <Link to="/user">用户管理  </Link>
          </Menu.Item>


          <Menu.Item key="/role" icon={<DesktopOutlined />}>
            <Link to="/role">角色管理 </Link>
          </Menu.Item>

          <SubMenu key="sub2" icon={<MailOutlined />} title="图形图表">
            <Menu.Item key="/charts/bar" icon={<AreaChartOutlined />} >

              <Link to="/charts/bar">柱形图</Link>
            </Menu.Item>
            <Menu.Item key="/charts/line" icon={<AreaChartOutlined />}>
              <Link to="/charts/line">折线图</Link>
            </Menu.Item>

            <Menu.Item key="/charts/pie" icon={<PieChartOutlined />}><Link to="/charts/pie">饼图</Link></Menu.Item>


          </SubMenu>
        </Menu>
      </div>
    )
  }
}
export default withRouter(index)