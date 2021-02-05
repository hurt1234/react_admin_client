import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'

import { Menu } from 'antd';
import {
  AreaChartOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './nav.less'

const { SubMenu } = Menu;
 class index extends Component {
  hasAuth = item =>{
   const { key,isPublic } = item
   const menus = memoryUtils.user.role.menus
   const username = memoryUtils.user.username
   /*
   1.如果当前的用户是admin
   2.如果当前item是公开的
   3.当前的用户胡有此item的权限：key有没有在menus中
   满足则返回true

    */
   if(username === "admin" || isPublic || menus.indexOf(key)!== -1) {
     return true
   }else if(item.children) {
     //当前用户有此item的某个item的权限
     return !!item.children.find(child => menus.indexOf(child.key)!== -1)

   }
   return false
  }
  getMenuNodes = menuList => {
    const path = this.props.location.pathname
    return menuList.reduce((pre,item)=>{
      if(this.hasAuth(item)) {
        if(!item.children) {
         pre.push(
          (
            <Menu.Item key={item.key} icon={<ContainerOutlined />}>
            <Link to={item.key}>{item.title}</Link>
           </Menu.Item>
           )
         )
        }else {
          //查找与当前请求路径匹配的字item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if(cItem) {
            this.openKey = item.key
          }
          pre.push((
            <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
          ))
        }

      }
  return pre
    },[])
  }
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
   //得到当前的请求路径
   let path = this.props.location.pathname
   if(path.indexOf('/product') ===0) {
     path = '/product'
   }
   if(path.indexOf('/charts') ===0) {
    path = '/charts'
  }
  // 得到需要打开菜单项的key
  const openKey = this.openKey
    return (
      <div className="nav">
        <Link className="header" to="/">
          <img src={logo} alt="" />
          <p>王者荣耀</p>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
        {
          this.menuNodes
        }
        </Menu>
      </div>
    )
  }
}
export default withRouter(index)