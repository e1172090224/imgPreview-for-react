import React from 'react';
import {render} from 'react-dom';
import ImgPreview from '../../src';

let imgData=[  
    {url:'//s2.loli.net/2021/12/10/VJHq6wNW8TtpYuQ.png',
    imgTitle:'图片1'},
    {url:'//s2.loli.net/2021/12/10/uyKi9V7hlfDJnO4.png',
    imgTitle:'图片2'},
    {url:'//s2.loli.net/2021/12/10/UGJc8VhmwOAI7jE.png',
    imgTitle:'图片3'}
]
  
const App = () => <ImgPreview 
    imageArr={imgData}
    imgIndex={0}
    showThumbnail={true}
/> 


render(<App />, document.getElementById("root"));