import React from 'react';
import ReactDOM from 'react-dom';
import ImgPreview from '../../src/imgPreview';

let imgData={
    
}
const App:any = () => <ImgPreview 
    imageArr={imgData}
    imgIndex={0}
    showThumbnail={false}
/> 


ReactDOM.render(<App />,document.getElementById('root'));