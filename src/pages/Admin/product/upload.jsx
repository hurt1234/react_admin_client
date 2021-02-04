import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import  { reqDeleteImg }  from '../../../api/index'

export default class PicturesWall extends Component {
  static propTypes = {
    imgs:PropTypes.array
  }
  /* state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ],
  }; */
  constructor(props) {
    super(props)
    let fileList = []
    //如果传入imgs属性
    const { imgs } = this.props
    if(imgs && imgs.length>0) {
      fileList = imgs.map((img,index)=>({
        uid: -index, // 每个file都有自己唯一的id
        name: img, // 图片文件名
        status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
        url: 'http://120.55.193.14:5000/upload/' + img

      }))
    }
      // 初始化状态
      this.state = {
        previewVisible: false, // 标识是否显示大图预览Modal
        previewImage: '', // 大图的url
        fileList // 所有已上传图片的数组
      }

  }
 /*
  获取所有已上传图片文件名的数组
   */
  getImgs  = () => {
    return this.state.fileList.map(file => file.name)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview =  file => {
    // 显示指定file对应的大图
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
      // 一旦上传成功, 将当前上传的file的信息修正(name, url)
      if(file.status==='done') {
        const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
        if(result.status===0) {
          message.success('上传图片成功!')
          const {name, url} = result.data
          file = fileList[fileList.length-1]
          file.name = name
          const newurl = url.replace(/localhost/igs, "120.55.193.14")
          file.url = newurl
        } else {
          message.error('上传图片失败')
        }
      } else if (file.status==='removed') { // 删除图片
        const result = await reqDeleteImg(file.name)
        if (result.status===0) {
          message.success('删除图片成功!')
        } else {
          message.error('删除图片失败!')
        }
      }

      // 在操作(上传/删除)过程中更新fileList状态
      this.setState({ fileList })

  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="http://120.55.193.14:5000/manage/img/upload" /*上传图片的接口地址*/
          accept='image/*'  /*只接收图片格式*/
          name='image' /*请求参数名*/
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
