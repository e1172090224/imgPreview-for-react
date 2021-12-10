import React from 'react';
import {render} from 'react-dom';
import ImgPreview from '../../src/imgPreview';
import MyComponent from '../../src';

let imgData=[  
    {url:'//s2.loli.net/2021/12/10/VJHq6wNW8TtpYuQ.png'},
    {url:'//s2.loli.net/2021/12/10/uyKi9V7hlfDJnO4.png'},
    {url:'//s2.loli.net/2021/12/10/UGJc8VhmwOAI7jE.png'}
]
  
const App = () => <ImgPreview 
    imageArr={imgData}
    imgIndex={0}
    showThumbnail={false}
/> 


render(<App />, document.getElementById("root"));