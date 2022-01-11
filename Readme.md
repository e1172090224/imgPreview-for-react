### 基于react实现的图片预览弹层：

安装使用`npm i img-preview-for-react`



### API

| 参数        | 说明                  | 类型                          | 默认值               | 版本 |
| ----------- | --------------------- | ----------------------------- | -------------------- | ---- |
| imageArr       | 图片项                | `Array<CardImagesItemsProps>` | []                   |
| imgIndex | 当前展示图片索引          | `number`                | 0 |
| showThumbnail | 是否展示底部缩略图 |    `boolean`        |    false      |
| close | 点击关闭按钮回调 |    `function`        |    -      |


```ts
type CardImagesItemsProps = {
  imgTitle?: string; // 图片标题，如果不传，则不大图预览时不展示标题
  thumbnail?: string; // 缩略图url，如果不传，则使用大图URL
  url?: string; // 大图url
};

```

### DEMO

![image](https://user-images.githubusercontent.com/38370643/147807979-663a6620-f22a-49ec-9ad1-ad179c6d187a.png)

![image](https://user-images.githubusercontent.com/38370643/147807937-e82d8272-e37b-4dc8-b7f3-0bb2454c0571.png)

```ts
import React, { Component } from 'react'
import ImgPreview from 'img-preview-for-react'
let imgData = [
  {
    url: 'https://img.ljcdn.com/beike/crep_c/1639033696525.jpg',
    imgTitle: '图片1'
  },
  {
    url: 'https://s2.loli.net/2021/12/10/uyKi9V7hlfDJnO4.png',
    imgTitle: '图片2'
  },
  {
    url: 'https://img.ljcdn.com/beike/crep_c/1625043131421.jpg',
    imgTitle: '图片3'
  }
]
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showImgPreview: false,
      imgIndex: 0
    }
  }
  openImgPreview = (index) => {
    this.setState({
      showImgPreview: true,
      imgIndex: index
    })
  }
  render() {
    return (
      <div>
        <ul>
          {imgData.map((item, index) => {
            return <img
              key={index}
              style={{ width: '100px', height: '100px' }}
              src={item.url}
              onClick={this.openImgPreview.bind(this, index)}></img>
          })}
        </ul>
        {this.state.showImgPreview ?
          <ImgPreview imageArr={imgData}
            imgIndex={this.state.imgIndex}
            showThumbnail={false} /> : null}
      </div>
    )
  }
}
```
