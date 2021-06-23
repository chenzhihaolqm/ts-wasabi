import React, { FC, useRef, useState, ChangeEvent } from 'react';
import axios from 'axios'
import classNames from 'classnames'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'loading' | 'success' | 'error';

export interface UploadFile {
  uid: string,
  size: number,
  name: string,
  status?: UploadFileStatus,
  percentage?: number,
  raw?: File,
  response?: any,
  error?: any,
}

export interface UploadProps {
  action: string,
  className?: string,
  style?: React.CSSProperties,
  name?: string,
  headers?: { [key: string]: any },
  data?: { [key: string]: any },
  defaultFileList?: UploadFile[],
  accept?: string,
  multiple?: boolean,
  withCredentials?: boolean,
  drag?: boolean,
  beforeUpload?: (file: File) => boolean | Promise<File>,
  onProgress?: (percentage: number, file: UploadFile) => void,
  onSuccess?: (data: any, file: UploadFile) => void,
  onError?: (err: any, file: UploadFile) => void,
  onChange?: (file: File) => void,
  onRemove?: (file: UploadFile) => void,
}

export const Upload:FC<UploadProps> = (props) => {
  const { className, action, defaultFileList, name, headers, data, withCredentials, accept, multiple, drag, 
    beforeUpload, onProgress, onSuccess,  onError, onChange, onRemove, style, children } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = classNames('wasabi-upload', className);

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const handleClick = () => {
    if(inputRef && inputRef.current){
      inputRef.current.click();
    }
  }
  const files = [];
  let uid = 0;

  const post = function(file: File) {
    let _file = {
      uid: Date.now() + 'upload-file',
      status: 'ready' as UploadFileStatus,
      name: name || 'file',
      size: file.size,
      percentage: 0,
      raw: file
    }
    setFileList([_file, ...fileList])
    const formData = new FormData();
    formData.append(file.name, file);
    if(data){
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipar/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round(e.loaded * 100 / e.total) || 0;
        console.log('progress', fileList)
        if(percentage < 100){
          onProgress && onProgress(percentage, _file)
        }
        setFileList((preFileList) => {
          return preFileList.map(item => {
            if(item.uid === _file.uid){
              item.percentage = percentage;
            }
            return item
          })
        })
      }
    }).then(res => {
      console.log('res:', res)
      if(inputRef.current){
        inputRef.current.value = '';
      }
      onSuccess && onSuccess(res.data, _file)
      if(onChange){
        onChange(file)
      }
      console.log('file', _file)
      setFileList((preFileList) => {
        return preFileList.map(item => {
          if(item.uid === _file.uid){
            item.status = 'success';
          }
          return item
        })
      })
    }).catch(err => {
      onError && onError(err, _file)
      if(onChange){
        onChange(file)
      }
      setFileList((preFileList) => {
        return preFileList.map(item => {
          if(item.uid === _file.uid){
            item.status = 'error';
          }
          return item
        })
      })
    })
  }
  const uploadFiles = (fileList: FileList) => {
    const files = Array.from(fileList);
    files.forEach(file => {
      if(!beforeUpload){
        post(file)
      }else {
        const result = beforeUpload(file);
        if(result && result instanceof Promise){
          result.then(f => {
            post(f)
          })
        } else if (result){
          post(file)
        }
      }
    })
  }
  const changeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files)
    const files = event.target.files;
    if(files){
      uploadFiles(files)
    }
    
    
    // name: "工属具权限编号.txt"
    // size: 14393
    // type: "text/plain"
    // webkitRelativePath: ""
  }

  //console.log('fileList', fileList)
  const handleRemove = function(file: UploadFile) {
    setFileList((preFiles) => {
      return preFiles.filter(pre => pre.uid !== file.uid)
    });
    onRemove && onRemove(file)
  }
  return (<>
     <div className={classes} style={style}>
       <div onClick={handleClick} style={{display: 'inline-block'}}>
          { drag ? <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger> : children
          }
          <input className="file-input" style={{ display: 'none' }} multiple={multiple} accept={accept} onChange={changeFileInput} ref={inputRef} type="file" />
       </div>
        <UploadList fileList={fileList} onRemove={handleRemove}/>
     </div>
  </>)
}

export default Upload;