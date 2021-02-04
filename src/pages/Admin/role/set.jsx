import React, { Component } from 'react'
import PropTypes from 'prop-types'
import menuList from '../../../config/authmenuConfig'
import {
  Form,
  Input,
  Tree
} from 'antd'
const Item = Form.Item
const  formItemLayout = {
  labelCol: { span: 4 },  // 左侧label的宽度
  wrapperCol: { span: 15 }, // 右侧包裹的宽度
}
export default class set extends Component {
  static propeTypes = {
    role:PropTypes.object
  }
  constructor(props) {
    super(props)
    // 根据传入角色的menus生成初始状态
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }

  }
  getMenus = () => this.state.checkedKeys //供父组件使用

  onCheck = (checkedKeys)=>{
    this.setState({ checkedKeys });
  }
/*
  当组件接收到新的属性时自动调用
   */
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }

  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    console.log(checkedKeys);
    return (
      <div>
       <Item label="角色名称" {...formItemLayout}  >
         <Input value={role.name}  disabled />
       </Item>
       <Tree
      checkable
      defaultExpandAll
      checkedKeys={checkedKeys}
      treeData={menuList}
      onCheck={this.onCheck}
    />
      </div>
    )
  }
}
