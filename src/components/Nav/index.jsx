import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
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
  /*   let openGroup;
    const path = this.props.location.pathname
    if(path === '/category' || path.indexOf("/product") ==0) {
      openGroup = "sub1"
    }else if(path ==='/charts/bar' || path === "/charts/line" || path === "/charts/pie") {
      openGroup = "sub2"
    } */
    return (
      <div className="nav">
        <Link className="header" to="/">
          <img src={logo} alt="" />
          <p>王者荣耀</p>
        </Link>
        <Menu
          //selectedKeys={[path]}
          //defaultOpenKeys={[openGroup]}
          mode="inline"
          theme="dark"
        >
        {
           menuList.map(item =>{
            if(item.children) {
              return (
                <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                {
                  item.children.map(citem =>{
                    return (
                      <Menu.Item key={citem.key} icon={<AreaChartOutlined />} >

                      <Link to={citem.key}>{citem.title}</Link>
                    </Menu.Item>
                    )
                  })
                }
              </SubMenu>
              )
            }else {
              return (
                <Menu.Item key={item.key} icon={<ContainerOutlined />}>
                <Link to={item.key}>{item.title}</Link>
               </Menu.Item>
               )
            }
           })
        }
        </Menu>
      </div>
    )
  }
}
export default withRouter(index)