import React, { Component } from 'react'

import { reqCategorys } from '../../../api/index'

import LinkButton from '../../../components/link-button'
import { Card, Button, message,Table, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined  } from '@ant-design/icons';
export default class index extends Component {
  state = {
    loading: false,
    categorys: [],
    parentId:"0",
    parentName:"",
    subCategorys:[],
    showModal:0  //0 全取消  1 添加 2 修改

  }
  //初始化表格列
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', // 显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (item) => ( // 返回需要显示的界面标签
          <span>
            <LinkButton onClick = {this.showUpdate}>修改分类</LinkButton>

            { this.state.parentId === "0" ? <LinkButton onClick={()=> this.showSub(item)}>查看子分类</LinkButton> : null }

          </span>
        )
      }
    ]
  }
  //修改分类显示
  showUpdate = ()=>{
    this.setState({
      showModal:2
    })
  }
  //添加分类显示
  showAdd = ()=>{
    this.setState({
      showModal:1
    })
  }
  //添加分类
  addCate = () => {

  }
  //修改分类
  updateCate = () => {

  }
  //取消Modal
  handleCancel = () =>{
    this.setState({
      showModal:0
    })
  }
   //查询一级分类
  showFirstCate = ()=>{

    this.setState ({
      parentId:"0",
      parentName:"",
      subCategorys:[]
    },()=>{
      this.getCategorys()
    })
  }
  //查询二级分类
  showSub = item =>{

   this.setState({
    parentId: item._id,
    parentName: item.name
   },()=>{
     //数据更新完执行
    this.getCategorys()
   })

  }
  //获取一级/二级分类
  getCategorys = async () => {
    this.setState({ loading: true })
    const { parentId } = this.state
    const res = await reqCategorys(parentId)
    this.setState({ loading: false })
    if (res.status === 0) {
      const categorys = res.data
      if(parentId === "0") {
        this.setState({ categorys })
      }else {
        this.setState({ subCategorys :categorys })
      }
    } else {
      message.error("请求列表失败")
    }

  }
  componentDidMount() {
    this.initColumns()
    this.getCategorys()
  }
  render() {
    const { categorys, loading,parentId,parentName,subCategorys } = this.state
    const title = parentId === "0" ?"一级分类" : <span>
      <LinkButton onClick={this.showFirstCate}>一级分类列表</LinkButton>
      <ArrowRightOutlined style={{marginRight:5}} />
      {parentName} </span>
    const extra = (<Button type='primary' onClick={this.showAdd}>
      <PlusOutlined />
    添加
    </Button>)
    return (
      <div>
        <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={ parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          pagination={{defaultPageSize: 4, showQuickJumper: true}}
        />
        <Modal title="添加分类" visible={this.state.showModal === 1} onOk={this.addCate} onCancel={this.handleCancel}>

      </Modal>
      <Modal title="修改分类" visible={this.state.showModal === 2} onOk={this.updateCate} onCancel={this.handleCancel}>

      </Modal>
        </Card>
      </div>
    )
  }
}
