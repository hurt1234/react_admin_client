import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message
} from 'antd'
import LinkButton from '../../../components/link-button'
import { formateDate } from '../../../utils/dateUtils'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../../api/index'
const Item = Form.Item
const Option = Select.Option
const layout = {
  labelCol: { span: 4 },  // 左侧label的宽度
  wrapperCol: { span: 15 }, // 右侧包裹的宽度
}
export default class User extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }
  state = {
    users: [],
    roles: [],
    addShow: false
  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        //[role_id] 这里的role_id是一个变量 通过这种方式拿到变量里面的值
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: "操作",
        render: (user) => {
          //拿到不同的user,做相同的事情
          return (
            <span>
              {/* 点击哪一个就拿到对应的user */}
              <LinkButton onClick={() => this.updateUser(user)} >修改</LinkButton>
              <LinkButton onClick={() => this.delUser(user)}>删除</LinkButton>
            </span>
          )
        }
      }
    ]
  }
  initRoleNames = (roles) => {
    //console.log(roles);
    this.roleNames = roles.reduce((pre, role) => {
      //通过[] 的方式拿变量的值
      pre[role._id] = role.name
      return pre

    }, {})
  }
  onCancel = () => {
    this.setState({ addShow: false })
    this.form.current.resetFields()
  }
  addhandleOk = () => {

  }
  /* 修改用户   */
  updateUser = (user) => {
    this.setState({
      addShow: true
    })
    this.user = user

  }
  /* 删除用户 */
  delUser = (user) => {
    Modal.confirm({
      title: `确认删除用户${user.username}吗？`,
      onOk: async () => {
        const res = await reqDeleteUser(user._id)
        if (res.status === 0) {
          message.success("删除用户成功")
          this.getUsers()
        }

      }
    });

  }
  /* 初始化用户数据 */
  getUsers = async () => {
    const res = await reqUsers()
    if (res.status === 0) {
      const { users, roles } = res.data
      //这里调用
      this.initRoleNames(roles)
      this.setState({
        users, roles
      })

    }

  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getUsers()

  }
  render() {
    const { users, addShow, roles } = this.state
    const user = this.user || {}
    const title = (
      <span>
        <Button type="primary" onClick={() => {
          this.setState({ addShow: true })
          this.user = null
        }} >创建用户</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: 3 }} />
        <Modal title={user._id ? "修改用户" : "添加用户"} visible={addShow} onOk={this.addhandleOk} onCancel={this.onCancel} >
          <Form {...layout} initialValues={user} ref={this.form} >
            <Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '必须填!' }]}>
              <Input placeholder="请输入用户名"></Input>
            </Item>
            {
              user._id ? "" : <Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '必须填!' }]}>
                <Input type="password" placeholder="请输入密码"></Input>
              </Item>
            }
            <Item
              label="手机号"
              name="phone"
              rules={[{ required: true, message: '必须填!' }]}>
              <Input type="tel" placeholder="请输入手机号"></Input>
            </Item>
            <Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: '必须填' }]}>
              <Input placeholder="请输入邮箱"></Input>
            </Item>
            <Item
              label="角色"
              name="role_id"
              rules={[{ required: true, message: '必须填' }]}>
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            </Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}
