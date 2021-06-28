import React, {useState} from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../Button/button'

import Upload, { UploadFile } from './upload'

const defaultFileList = [
  { uid: '123', name: 'hehe.png', size: 120, status: 'ready', percentage: 0 },
  { uid: '124', name: 'haah.png', size: 120, status: 'loading', percentage: 50 },
  { uid: '125', name: 'hello.png', size: 120, status: 'loading', percentage: 80 },
  { uid: '126', name: 'nb.png', size: 120, status: 'success', percentage: 100 },
  { uid: '127', name: 'error.png', size: 120, status: 'error', percentage: 0 }
];


// const [fileList, setFileList] = useState(defaultFileList)

const checkFileSize = (file: File) => {
  if(Math.round(file.size / 1024 / 1024) > 50){
    alert('file too large')
    return false;
  } 
  return true
}
const filePromise = (file: File) => {
  let newFile = new File([file], 'newFile.png', { type: file.type } )
  return Promise.resolve(newFile)
}
const handleRemove = (file: UploadFile) => {
}

const defaultUpload = () => (
  <Upload style={{width: '60%'}} action="https://run.mocky.io/v3/b2f60ed1-5058-4d02-b2fa-8fe604ae24ef" multiple accept=".png"
  name="ha" beforeUpload={filePromise} onProgress={(percentage, file) => {console.log(percentage)}}
  onRemove={handleRemove} onError={(e, file) => {console.log(e)}} >
    <Button btnType="primary" >上传</Button>
  </Upload>
)

const widthDataUpload = () => (
  <Upload style={{width: '60%'}} action="https://run.mocky.io/v3/b2f60ed1-5058-4d02-b2fa-8fe604ae24ef" multiple accept=".png"
  name="ha" data={{key: 1 }} headers={{h: 'h'}}  beforeUpload={filePromise} onProgress={(percentage, file) => {console.log(percentage)}}
  onRemove={handleRemove} onError={(e, file) => {console.log(e)}} >
    <Button btnType="primary" >上传</Button>
  </Upload>
)

const dragUpload = () => (
  <Upload style={{width: '60%'}} action="https://run.mocky.io/v3/b2f60ed1-5058-4d02-b2fa-8fe604ae24ef" multiple accept=".png"
  name="ha" beforeUpload={filePromise} onProgress={(percentage, file) => {console.log(percentage)}}
  onRemove={handleRemove} onError={(e, file) => {console.log(e)}} drag >
    <div>点击或拖动到此区域上传</div>
  </Upload>
)

storiesOf('Upload Component', module)
  .add('Upload', defaultUpload)
  .add('带有data与headers上传', widthDataUpload)
  .add('允许拖动上传', dragUpload)
  