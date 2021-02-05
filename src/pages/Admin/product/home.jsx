import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'
import { PlusOutlined  } from '@ant-design/icons';
import LinkButton from'../../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../../api/index'
import memoryUtils from '../../../utils/memoryUtils'
const Option = Select.Option
export default class home extends Component {
  state = {
    products:[],
    total:"",
    loading:false,
    searchName: '', // 搜索的关键字
    searchType: 'productName', // 根据哪个字段搜索
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price  // 当前指定了对应的属性, 传入的是对应的属性值
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const {status, _id} = product
          const newStatus = status===1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick= {()=>this.updateStatus(_id, newStatus)}
              >
                { status === 1 ? "下架" : "上架" }
              </Button>
              <span>{status===1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              {/*将product对象使用state传递给目标路由组件*/}
              <LinkButton onClick = { ()=> this.showDetail(product) } >详情</LinkButton>
              <LinkButton onClick= { () => this.showUpdate(product) }>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }
  showDetail = (product)=>{
    memoryUtils.product = product
    this.props.history.push('/product/detail')
  }
  showUpdate = (product)=>{
    memoryUtils.product = product
    this.props.history.push('/product/add')
  }
   /*
  更新指定商品的状态
   */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if(result.status===0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }
  //
  getProducts = async (pageNum)=>{

    this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
    this.setState({loading: true}) // 显示loading

    const {searchName, searchType} = this.state
    // 如果搜索关键字有值, 说明我们要做搜索分页
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: 3, searchName, searchType})
    } else { // 一般分页请求
      result = await reqProducts(pageNum, 3)
    }

    this.setState({loading: false}) // 隐藏loading
    if (result.status === 0) {
      // 取出分页数据, 更新状态, 显示分页列表
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  componentDidMount() {
    this.initColumns()
    this.getProducts(1)
  }
  render() {
    const { products, total, loading } = this.state
    const title = (
      <span>
        <Select
          defaultValue= "productName"
          style={{width: 150}}
          onChange = { value => this.setState({ searchType:value }) }

        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{width: 150, margin: '0 15px'}}
          onChange = { event => this.setState({ searchName:event.target.value }) }
        />
        <Button type='primary' onClick = { ()=>this.getProducts(1) } >搜索</Button>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/add')}>
          <PlusOutlined />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
         loading={loading}
          bordered
          rowKey='_id'
          dataSource={products}
          columns={this.columns}
          pagination={{
            current:this.pageNum,
            total,
            defaultPageSize: 3,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
