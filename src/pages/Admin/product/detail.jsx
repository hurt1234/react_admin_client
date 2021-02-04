import React, { Component } from 'react'

import {
  Card,
  List
} from 'antd'
import { ArrowLeftOutlined  } from '@ant-design/icons';
import LinkButton from '../../../components/link-button'
import { reqCategory  } from "../../../api/index";
import memoryUtils from '../../../utils/memoryUtils'
const Item = List.Item

export default class detail extends Component {
  render() {
    //console.log(memoryUtils.product)
    const {name, desc, price, detail, imgs=[]} = memoryUtils.product
    const title = (
      <span>
        <LinkButton>
        <ArrowLeftOutlined
         style={{marginRight: 10, fontSize: 20}}
         onClick={() => this.props.history.goBack()} />

        </LinkButton>

        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
      <List>
        <Item>
          <span className="left">商品名称:</span>
          <span>{name}</span>
        </Item>
        <Item>
          <span className="left">商品描述:</span>
          <span>{desc}</span>
        </Item>
        <Item>
          <span className="left">商品价格:</span>
          <span>{price}元</span>
        </Item>
        <Item>
          <span className="left">所属分类:</span>
          <span>那你</span>
        </Item>
        <Item>
          <span className="left">商品图片:</span>
          <span>
            {
              imgs.map(img => (
                <img
                  key={img}
                  src={"http://120.55.193.14:5000/upload/" + img}
                  className="product-img"
                  alt="img"
                />
              ))
            }
          </span>
        </Item>
        <Item>
          <span className="left">商品详情:</span>
          <span dangerouslySetInnerHTML={{__html: detail}}>
          </span>
        </Item>

      </List>
    </Card>
    )
  }
}
