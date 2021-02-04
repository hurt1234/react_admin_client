import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'
const Item = Form.Item
export default class add extends Component {
  static propTypes = {
    setForm:PropTypes.func.isRequired
  }
 componentDidMount() {
   this.props.setForm(this.form)
 }
  render() {
    return (
      <div>
        <Form ref={form=>this.form = form} >
          <Item
            label="角色名称"
            name="roleName"
            rules={[
              {
                required: true,
                message: '请输入角色名称',
              }
            ]}>
            <Input placeholder="请输入角色名称"/>
          </Item>
        </Form>
      </div>
    )
  }
}
