import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import {formateDate} from '../../../utils/dateUtils'
import AddForm from './add'
import SetForm from './set'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../../api/index'
import memoryUtils from '../../../utils/memoryUtils'



export default class inedx extends Component {
  state = {
    roles:[],//所有的角色列表
    role:{}, //选中的角色
    addShow: false,
    setShow: false
  }
  initColumn = ()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }
  getRoles = async () =>{
    const res = await reqRoles()
    const roles = res.data
    this.setState({roles})

  }
  /*
  设置权限操作 */
  setOk =  async() => {
   const role = this.state.role
   const menus =  this.auth.getMenus()
   role.menus = menus
   role.auth_time = Date.now()
   role.auth_name = memoryUtils.user.username
   const result = await reqUpdateRole(role)
   if (result.status===0) {

     this.setState({
       setShow:false
     })
     message.success("更新权限成功")
     this.getRoles()
   }


  }
  /*
  添加操作 */
  addOk = () => {
    this.form.validateFields().then( async value =>{
      if(value) {
        const roleName = value.roleName
        this.form.resetFields()
        // 请求添加
       const result = await reqAddRole(roleName)
       console.log(result);

       if(result.status===0) {
         this.setState({
           addShow:false
         })

         const role = result.data
         this.setState({
           roles:[...this.state.roles,role]
         })
         message.success("添加成功")
       }

      }else {
        message.error("网络错误")
      }
    })

  }
  componentWillMount () {
    this.initColumn()
  }

  componentDidMount () {
    this.getRoles()
  }
  onRow = (role) =>{
    return {
      onClick: event => { // 点击行
        this.setState({
          role
        })
      },
    }
  }
  render() {
    const { addShow, setShow, roles, role } = this.state
    const title = (
      <span>
        <Button type="primary" style={{ marginRight: "8px" }} onClick={
          () => {
            this.setState({
              addShow: true
            })
          }
        }>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={() => this.setState({ setShow: true })}>设置角色权限</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
         bordered
         rowKey='_id'
         columns={this.columns}
         dataSource={roles}
         rowSelection={{
           type:"radio",
           selectedRowKeys:[role._id],
           onSelect:(role)=>{
             this.setState({role})
           }

         }}
         onRow={this.onRow}
        />
        <Modal title="添加角色" visible={addShow} onOk={this.addOk} onCancel={() =>{
          this.setState({ addShow: false })
          this.form.resetFields()
        }
         }>
          <AddForm setForm={(form) => this.form = form} />
        </Modal>
        <Modal title="设置角色权限" visible={setShow} onOk={this.setOk} onCancel={() => this.setState({ setShow: false })}>
          <SetForm ref={auth => this.auth= auth} role = {role} />
        </Modal>

      </Card>

    )
  }
}
