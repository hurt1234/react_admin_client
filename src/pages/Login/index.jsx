import React, { Component } from 'react'


import { reqLogin } from '../../api/index'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'

//导入组件样式
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//导入自己的样式
import logo from '../../assets/images/logo.png'
import './login.less'



export default class Login extends Component {
  formRef = React.createRef()
  onFinish = async (values) => {
    const { username, password } = values
    try {
      const value = await this.formRef.current.validateFields();
      if(value) {
        const data = await reqLogin(username, password)
        if(data.status ===0) {
          message.success("登录成功")
          storageUtils.saveUser(data.data)
          memoryUtils.user = data.data
          this.props.history.replace('/');
        }else {
          message.error("用户名或密码错误")
        }
      }

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);

    }
  }
  componentDidMount() {
    let obj = memoryUtils.user || {}
    if(obj.username) {
      message.success("您已登录")
      this.props.history.replace('/')

    }
  }
  render() {
    return (
      <div className="login">
        <div className="header">
          <img className="img" src={logo} alt="图片错误" />
          <h2>欢迎来到王者荣耀</h2>

        </div>
        <div className="content">
          <h3>欢迎登陆</h3>
          <Form
            ref={this.formRef}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '用户名必须输入' },
                { min: 4, message: "至少输入六位" },
                { max: 12, message: "最多12位" },
                /* { pattern: /(?=.*[A-Za-z])(?=.*[\d])(?=.*_)/, message: "必须包含字母数字和_" } */
              ]}
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
