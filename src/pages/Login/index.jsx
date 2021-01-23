import React, { Component } from 'react'

//导入组件样式
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//导入自己的样式
import logo from './images/logo.png'
import './login.less'

export default class Login extends Component {
  onFinish = (values)=> {
  const {username, password} = values
  }
  render() {
    return (
      <div className="login">
       <div className="header">
         <img className="img" src={logo} alt="图片错误"/>
         <h2>欢迎来到王者荣耀</h2>

       </div>
       <div className="content">
         <h3>欢迎登陆</h3>
         <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登陆
        </Button>

      </Form.Item>
    </Form>


       </div>
      </div>
    )
  }
}
