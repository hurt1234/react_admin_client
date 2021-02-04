import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item


export default class add_form extends Component {

  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired// 用来传递form对象的函数
  }



  componentDidMount() {
    this.props.setForm(this.form)
  }
  render() {
    const { categoryName } = this.props
    return (
      <div>
        <Form
          ref={(form) => this.form = form}
          initialValues={
            { userName: categoryName }

          }>
          <Item name="userName"
          rules={[{ required: true, message: '必须填!' }]}>
            <Input placeholder='请输入分类名称' />
          </Item>
        </Form>

      </div>

    )
  }
}
