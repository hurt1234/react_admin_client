import React, { Component } from 'react'

import { Card, Form, Input, Button, Cascader, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../../components/link-button'
import memoryUtils from '../../../utils/memoryUtils'
import PicturesWall from './upload'
import RichTextEditor from './richText'
import { reqCategorys, reqAddOrUpdateProduct } from '../../../api/index'
const Item = Form.Item

const { TextArea } = Input;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 8 },
};
export default class add extends Component {
  state = {
    options: []
  }
  initOptions = async (categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false // 不是叶子
    }))
    const { product, isUpdate } = this
    const { pCategoryId } = product
    if (isUpdate && pCategoryId !== "0") {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
        // 找到当前商品对应的一级option对象
      const targetOption = options.find(option => option.value===pCategoryId)

        // 关联对应的一级option上
        targetOption.children = childOptions
    }
    this.setState({
      options
    })
  }
  /*
  请求分类列表 */
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)   // {status: 0, data: categorys}
    if (result.status === 0) {
      const categorys = result.data
      // 如果是一级分类列表
      if (parentId === '0') {
        this.initOptions(categorys)
      } else { // 二级列表
        return categorys  // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
      }
    }
  }
  /*
  验证价格的自定义验证函数
   */
  validatePrice = (rule, value, callback) => {
    //console.log(value, typeof value)
    if (value * 1 > 0) {
      callback() // 验证通过
    } else {
      callback('价格必须大于0') // 验证没通过
    }
  }
  onFinish =  async (values) => {
    if(values) {
         // 1. 收集数据, 并封装成product对象
         const {name, desc, price, categoryIds} = values
         let pCategoryId, categoryId
         if (categoryIds.length===1) {
           pCategoryId = '0'
           categoryId = categoryIds[0]
         } else {
           pCategoryId = categoryIds[0]
           categoryId = categoryIds[1]
         }

         const imgs = this.pw.getImgs()

         const detail = this.editor.getDetail()

         const product = {name, desc, price, imgs, detail, pCategoryId, categoryId}

         // 如果是更新, 需要添加_id
         if(this.isUpdate) {
           product._id = this.product._id
         }

         // 2. 调用接口请求函数去添加/更新
         const result = await reqAddOrUpdateProduct(product)

         // 3. 根据结果提示
         if (result.status===0) {
           message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
           this.props.history.goBack()
         } else {
           message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
         }
    }


  }
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    // 根据选中的分类, 请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false;
    // 二级分类数组有数据
    if (subCategorys && subCategorys.length > 0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前option上
      targetOption.children = childOptions
    } else { // 当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options]
    })
  }
  componentWillMount() {
    // 取出携带的state
    const product = memoryUtils.product  // 如果是添加没值, 否则有值
    // 保存是否是更新的标识
    this.isUpdate = !!product._id
    // 保存商品(如果没有, 保存是{})
    this.product = product || {}
  }
  componentDidMount() {
    this.getCategorys("0")
  }
  /*
 在卸载之前清除保存的数据
 */
  componentWillUnmount() {
    memoryUtils.product = {}
  }
  render() {
    const { options } = this.state
    const { isUpdate, product = {} } = this
    const { pCategoryId, categoryId, imgs, detail } = product
    const categoryIds = []
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId)
      } else {
        categoryIds.push(categoryId)
        categoryIds.push(pCategoryId)
      }
    }
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()} />
          <span>{isUpdate ? "修改商品" : "添加商品"}</span>
        </LinkButton>
      </span>
    )


    return (
      <Card title={title} >
        <Form {...layout} onFinish={this.onFinish}>
          <Item initialValue={product.name} name="name" label="商品名称" rules={[{ required: true, message: "必须填" }]} >
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item name="desc" initialValue={product.desc} label="商品描述" rules={[{ required: true, message: "必须填" }]} >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="请输入商品描述" />
          </Item>
          <Item name="price" initialValue={product.price} label="商品价格" rules={[{ required: true, message: "必须填" }, { validator: this.validatePrice }]} >
            <Input placeholder="请输入商品价格" type="number" addonAfter="元" />
          </Item>
          <Item name="categoryIds" initialValue={categoryIds} label="商品分类" rules={[{ required: true, message: "必须填" }]} >
            <Cascader placeholder='请指定商品分类' options={options} loadData={this.loadData} popupPlacement="bottomLeft" />
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={(pw)=>this.pw = pw} imgs={imgs} />
          </Item>
          <Item label="商品详情" labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={ c=>this.editor=c} detail={detail}/>
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              提交
        </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
