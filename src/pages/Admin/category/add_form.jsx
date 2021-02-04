import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Select} from 'antd'

const  Item   = Form.Item
const  Option  = Select.Option

export default class add_form extends Component {
  static propTypes = {

    setForm: PropTypes.func.isRequired, // 用来传递form对象的函数
    categorys: PropTypes.array.isRequired, // 一级分类的数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
  }
  componentDidMount() {
    this.props.setForm(this.form)
  }
  render() {
    const {categorys, parentId} = this.props
    return (
      <div>
        <Form ref={item => this.form = item}
         initialValues={
          {  parentId ,
            categoryName:"" }

        }
         >
          <Item name="parentId">
            <Select>
              <Option value="0" key="0">一级分类</Option>
              {categorys.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}

            </Select>
          </Item>
          <Item name="categoryName" rules={[{ required: true, message: '必须填!' }]}>
            <Input placeholder="请输入分类名称"></Input>
          </Item>
        </Form>

      </div>
    )
  }
}
