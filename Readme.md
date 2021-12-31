基于react实现的图片预览弹层：

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
  imageTitle?: string; // 图片标题，如果不传，则不大图预览时不展示标题
  thumbnail?: string; // 缩略图url，如果不传，则使用大图URL
  url?: string; // 大图url
};

```
