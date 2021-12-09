import React, { Component } from 'react';
import './index.less';
// 大图预览组件接口
export interface ImgPreviewState {
  imgIndex: any;
  imageArr: any[];
  rotate: number;
  imgSize: number;
  imgStyle: object;
  ImgHeight: number;
  ImgWidth: number;
}
export interface ImgPreviewProps {
  imageArr: any[];
  imgIndex: any;
  close?: any;
  showThumbnail: boolean;
}
export default class ImgPreview extends Component<
  ImgPreviewProps,
  ImgPreviewState
> {
  photoSwipe!: any;
  imgCon!: any;
  windowW: number;
  windowH: number;
  static defaultProps = {
    prefixCls: 'kedpro-card-img-Preview',
  };
  constructor(props: ImgPreviewProps) {
    super(props);
    this.state = {
      imgIndex: 0, //当前图片索引
      imageArr: [], //图片数组
      rotate: 1, //旋转初始值
      imgSize: 1, //放大倍数
      imgStyle: {}, //图片样式
      ImgHeight: 0, //宽高初始值
      ImgWidth: 0, //宽高初始值
    };
    this.windowW = document.body.offsetWidth;
    this.windowH = this.props.showThumbnail
      ? document.body.offsetHeight - 200
      : document.body.offsetHeight - 50;
  }
  componentDidMount(): void {
    const { imageArr, imgIndex } = this.props;
    // 打开浮层时，阻止页面滚动
    document.documentElement.style.overflowY = 'hidden';
    this.setState(
      {
        imgIndex: imgIndex,
        imageArr: imageArr,
      },
      () => {
        this.setImgStyle();
      },
    );
  }
  // 重置图片样式
  setImgStyle(): void {
    const { imgIndex, imageArr } = this.state;

    this.setState({
      rotate: 1,
      ImgWidth: this.windowW,
      ImgHeight: this.windowH,
      imgStyle: {
        backgroundImage: `url(${imageArr[imgIndex]?.url})`,
        width: this.windowW,
        height: this.windowH,
      },
    });
    this.imgCon.style.transform = '';
  }
  //上一页
  goBeforePage(): void {
    if (this.state.imgIndex != 0) {
      this.setState(
        {
          imgIndex: this.state.imgIndex - 1,
          imgSize: 1,
        },
        () => {
          this.setImgStyle();
        },
      );
    } else {
      this.setState(
        {
          imgIndex: this.state.imageArr.length - 1,
          imgSize: 1,
        },
        () => {
          this.setImgStyle();
        },
      );
    }
  }
  //下一页
  goAfterPage(): void {
    if (this.state.imgIndex == this.state.imageArr.length - 1) {
      this.setState(
        {
          imgIndex: 0,
          imgSize: 1,
        },
        () => {
          this.setImgStyle();
        },
      );
    } else {
      this.setState(
        {
          imgIndex: this.state.imgIndex + 1,
          imgSize: 1,
        },
        () => {
          this.setImgStyle();
        },
      );
    }
  }
  changeImg(index: number): void {
    this.setState(
      {
        imgIndex: index,
        imgSize: 1,
      },
      () => {
        this.setImgStyle();
      },
    );
  }
  closePhotoSwipe(): void {
    document.documentElement.style.overflowY = 'scroll';
    this.props.close && this.props.close(false);
  }
  //旋转按钮点击事件
  rotateImg(): void {
    const { imgIndex, imageArr } = this.state;
    this.setState({
      rotate: this.state.rotate + 1,
      imgSize: 1, //重置尺寸
      ImgWidth: this.imgCon.offsetWidth, //重置宽高
      ImgHeight: this.imgCon.offsetHeight, //重置宽高
      imgStyle: {
        transform: `rotate(-${this.state.rotate * 90}deg)`,
        backgroundImage: `url(${imageArr[imgIndex]?.url})`,
        width: this.state.rotate % 2 == 1 ? this.windowH : this.windowW,
        height: this.state.rotate % 2 == 1 ? this.windowW : this.windowH,
      },
    });
  }
  //放大按钮
  enlargeImge(): void {
    const { imgSize, imageArr, imgIndex, rotate } = this.state;
    //旋转90度
    if (rotate % 4 == 2) {
      this.setState(
        {
          imgSize: imgSize + 0.25,
          imgStyle:
            imgSize >= 1
              ? {
                  backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                  width: this.windowH * (imgSize + 0.25) + 'px',
                  height:
                    this.state.imgSize >= 1
                      ? this.windowW * (imgSize + 0.25) + 'px'
                      : '100%',
                }
              : {
                  backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                  width: this.windowH * (imgSize + 0.25) + 'px',
                  height:
                    this.state.imgSize >= 1
                      ? this.windowW * (imgSize + 0.25) + 'px'
                      : '100%',
                },
        },
        () => {
          if (imgSize >= 1) {
            this.setState(
              {
                ImgWidth: this.imgCon.offsetWidth,
                ImgHeight: this.imgCon.offsetHeight,
                imgStyle: {
                  ...this.state.imgStyle,
                  transform: `rotate(-${
                    (this.state.rotate - 1) * 90
                  }deg) translate(${this.windowH - this.imgCon.offsetWidth}px,${
                    this.windowH
                  }px)`,
                  transformOrigin: `0 ${this.windowH}px`,
                },
              },
              () => {
                const scrollWidth = this.imgCon.offsetWidth - this.windowH;
                const scrollHeight = this.imgCon.offsetHeight - this.windowW;
                this.photoSwipe.scrollTo(scrollHeight / 2, scrollWidth / 2);
              },
            );
          } else {
            this.setState({
              ImgWidth: this.imgCon.offsetWidth,
              ImgHeight: this.imgCon.offsetHeight,
              imgStyle: {
                ...this.state.imgStyle,
                transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
              },
            });
          }
        },
      );
    } else if (rotate % 2 == 1) {
      //0度与180度
      this.setState(
        {
          imgSize: imgSize + 0.25,
          imgStyle: {
            backgroundImage: `url(${imageArr[imgIndex]?.url})`,
            width:
              this.state.imgSize >= 1
                ? this.windowW * (imgSize + 0.25) + 'px'
                : '100%',
            height: this.windowH * (imgSize + 0.25) + 'px',
          },
        },
        () => {
          this.setState(
            {
              ImgWidth: this.imgCon.offsetWidth,
              ImgHeight: this.imgCon.offsetHeight,
              imgStyle: {
                ...this.state.imgStyle,
                transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
              },
            },
            () => {
              if (imgSize >= 1) {
                const photoSwipeWidth =
                  this.imgCon.offsetWidth - document.body.clientWidth;
                const photoSwipeHeight =
                  this.imgCon.offsetHeight -
                  (this.props.showThumbnail
                    ? document.body.offsetHeight - 200
                    : document.body.offsetHeight);
                this.photoSwipe.scrollTo(
                  photoSwipeWidth / 2,
                  photoSwipeHeight / 2,
                );
              } else {
                this.setState({
                  ImgWidth: this.imgCon.offsetWidth,
                  ImgHeight: this.imgCon.offsetHeight,
                  imgStyle: {
                    ...this.state.imgStyle,
                    transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
                  },
                });
              }
            },
          );
        },
      );
    } else if (rotate % 4 == 0) {
      //270度
      this.setState(
        {
          imgSize: imgSize + 0.25,
          imgStyle:
            imgSize >= 1
              ? {
                  backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                  width: this.windowH * (imgSize + 0.25) + 'px',
                  height:
                    this.state.imgSize >= 1
                      ? this.windowW * (imgSize + 0.25) + 'px'
                      : '100%',
                }
              : {
                  backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                  width: this.windowH * (imgSize + 0.25) + 'px',
                  height:
                    this.state.imgSize >= 1
                      ? this.windowW * (imgSize + 0.25) + 'px'
                      : '100%',
                },
        },
        () => {
          if (imgSize >= 1) {
            this.setState(
              {
                ImgWidth: this.imgCon.offsetWidth,
                ImgHeight: this.imgCon.offsetHeight,
                imgStyle: {
                  ...this.state.imgStyle,

                  transform: `rotate(-${
                    (this.state.rotate - 1) * 90
                  }deg) translate(-${this.windowH}px,${
                    this.windowH - this.imgCon.offsetHeight
                  }px)`,
                  transformOrigin: `0 ${this.windowH}px`,
                },
              },
              () => {
                const scrollWidth = this.imgCon.offsetWidth - this.windowH;
                const scrollHeight = this.imgCon.offsetHeight - this.windowW;
                this.photoSwipe.scrollTo(scrollHeight / 2, scrollWidth / 2);
              },
            );
          } else {
            this.setState({
              ImgWidth: this.imgCon.offsetWidth,
              ImgHeight: this.imgCon.offsetHeight,
              imgStyle: {
                ...this.state.imgStyle,
                transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
              },
            });
          }
        },
      );
    }
  }
  //缩小按钮
  narrowImg(): void {
    const { imgSize, imageArr, imgIndex, rotate } = this.state;
    if (imgSize - 0.25 > 0) {
      //旋转90度
      if (rotate % 4 == 2) {
        this.setState(
          {
            imgSize: imgSize - 0.25,
            imgStyle:
              imgSize >= 1
                ? {
                    backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                    width: this.windowH * (imgSize - 0.25) + 'px',
                    height:
                      this.state.imgSize >= 1
                        ? this.windowW * (imgSize - 0.25) + 'px'
                        : '100%',
                  }
                : {
                    backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                    width: this.windowH * (imgSize - 0.25) + 'px',
                    height:
                      this.state.imgSize >= 1
                        ? this.windowW * (imgSize - 0.25) + 'px'
                        : '100%',
                  },
          },
          () => {
            if (this.state.imgSize > 1) {
              this.setState(
                {
                  ImgWidth: this.imgCon.offsetWidth,
                  ImgHeight: this.imgCon.offsetHeight,
                  imgStyle: {
                    ...this.state.imgStyle,
                    transform: `rotate(-${
                      (this.state.rotate - 1) * 90
                    }deg) translate(${
                      this.windowH - this.imgCon.offsetWidth
                    }px,${this.windowH}px)`,
                    transformOrigin: `0 ${this.windowH}px`,
                  },
                },
                () => {
                  const scrollWidth = this.imgCon.offsetWidth - this.windowH;
                  const scrollHeight = this.imgCon.offsetHeight - this.windowW;
                  this.photoSwipe.scrollTo(scrollHeight / 2, scrollWidth / 2);
                },
              );
            } else {
              this.setState({
                ImgWidth: this.imgCon.offsetWidth,
                ImgHeight: this.imgCon.offsetHeight,
                imgStyle: {
                  ...this.state.imgStyle,
                  transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
                },
              });
            }
          },
        );
      } else if (rotate % 2 == 1) {
        // 0度与180度
        this.setState(
          {
            imgSize: imgSize - 0.25,
            imgStyle: {
              backgroundImage: `url(${imageArr[imgIndex]?.url})`,
              width: this.windowW * (imgSize - 0.25) + 'px',
              height: this.windowH * (imgSize - 0.25) + 'px',
            },
          },
          () => {
            this.setState(
              {
                ImgWidth: this.imgCon.offsetWidth,
                ImgHeight: this.imgCon.offsetHeight,
                imgStyle: {
                  ...this.state.imgStyle,
                  transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
                },
              },
              () => {
                if (this.state.imgSize > 1) {
                  const photoSwipeWidth =
                    this.imgCon.offsetWidth - document.body.clientWidth;
                  const photoSwipeHeight =
                    this.imgCon.offsetHeight -
                    (this.props.showThumbnail
                      ? document.body.offsetHeight - 200
                      : document.body.offsetHeight);
                  this.photoSwipe.scrollTo(
                    photoSwipeWidth / 2,
                    photoSwipeHeight / 2,
                  );
                } else {
                  this.setState({
                    ImgWidth: this.imgCon.offsetWidth,
                    ImgHeight: this.imgCon.offsetHeight,
                    imgStyle: {
                      ...this.state.imgStyle,
                      transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
                    },
                  });
                }
              },
            );
          },
        );
      } else if (rotate % 4 == 0) {
        // 270度
        this.setState(
          {
            imgSize: imgSize - 0.25,
            imgStyle:
              imgSize >= 1
                ? {
                    backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                    width: this.windowH * (imgSize - 0.25) + 'px',
                    height:
                      this.state.imgSize >= 1
                        ? this.windowW * (imgSize - 0.25) + 'px'
                        : '100%',
                  }
                : {
                    backgroundImage: `url(${imageArr[imgIndex]?.url})`,
                    width: this.windowH * (imgSize - 0.25) + 'px',
                    height:
                      this.state.imgSize >= 1
                        ? this.windowW * (imgSize - 0.25) + 'px'
                        : '100%',
                  },
          },
          () => {
            if (this.state.imgSize > 1) {
              this.setState(
                {
                  ImgWidth: this.imgCon.offsetWidth,
                  ImgHeight: this.imgCon.offsetHeight,
                  imgStyle: {
                    ...this.state.imgStyle,
                    transform: `rotate(-${
                      (this.state.rotate - 1) * 90
                    }deg) translate(-${this.windowH}px,${
                      this.windowH - this.imgCon.offsetHeight
                    }px)`,
                    transformOrigin: `0 ${this.windowH}px`,
                  },
                },
                () => {
                  const scrollWidth = this.imgCon.offsetWidth - this.windowH;
                  const scrollHeight = this.imgCon.offsetHeight - this.windowW;
                  this.photoSwipe.scrollTo(scrollHeight / 2, scrollWidth / 2);
                },
              );
            } else {
              this.setState({
                ImgWidth: this.imgCon.offsetWidth,
                ImgHeight: this.imgCon.offsetHeight,
                imgStyle: {
                  ...this.state.imgStyle,
                  transform: `rotate(-${(this.state.rotate - 1) * 90}deg)`,
                },
              });
            }
          },
        );
      }
    } else {
      this.setState({
        ImgWidth: this.imgCon.offsetWidth,
        ImgHeight: this.imgCon.offsetHeight,
      });
    }
  }
  render() {
    const { imgIndex, imageArr, imgSize, imgStyle } = this.state;
    return (
      <div className={'preview-photo_swipe'}>
        <div className={'preview-topbar'}>
          <span className={'preview-title'}>实勘图</span>
          <span className={'preview-page-num'}>
            {imgIndex + 1}/{imageArr.length}
          </span>
          {/* 旋转 */}
          <span
            className={'preview-rotate-icon'}
            onClick={this.rotateImg.bind(this)}
          ></span>
          {/* 放大 */}
          <span
            className={'preview-enlarge-icon'}
            onClick={this.enlargeImge.bind(this)}
          ></span>
          {/* 尺寸 */}
          <span className={'preview-img-size'}>{imgSize * 100 + '%'}</span>
          {/* 缩小 */}
          <span
            className={'preview-narrow-icon'}
            onClick={this.narrowImg.bind(this)}
          ></span>
          {/* 关闭 */}
          <span
            className={'preview-close-icon'}
            onClick={this.closePhotoSwipe.bind(this)}
          ></span>
        </div>
        {/* 上一张 */}
        <div
          className={`Preview-left`}
          onClick={this.goBeforePage.bind(this)}
        >
          <span></span>
        </div>
        {/* 图片展示区域 */}
        <div
          className={
            this.props.showThumbnail
              ? `Preview-center`
              : `Preview-center_large`
          }
          ref={(el) => {
            this.photoSwipe = el;
          }}
        >
          <div
            className={
              imgSize <= 1
                ? `Preview-img_con_small`
                : `Preview-img_con`
            }
            style={imgStyle}
            ref={(el) => {
              this.imgCon = el;
            }}
          ></div>
        </div>
        {/* 下一张 */}
        <div
          className={`Preview-right`}
          onClick={this.goAfterPage.bind(this)}
        >
          <span></span>
        </div>
        {/* 缩略图 */}
        {this.props.showThumbnail ? (
          <div className={`Preview-footer`}>
            <ul className={'preview-footer-ul'}>
              {imageArr.map((item: any, index: number) => {
                return (
                  <li>
                    <img
                      key={index}
                      src={item.thumbnail || item.url}
                      onClick={this.changeImg.bind(this, index)}
                      className={index == imgIndex ? `active` : ''}
                    ></img>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }
}
