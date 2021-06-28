import React, { FC, useRef, useState, ChangeEvent } from 'react';

import { UploadFile } from './upload'
import Progress from '../Progress/index'

import Icon from '../Icon/icon'

interface UploadListProps{
  fileList: UploadFile[],
  onRemove: (file: UploadFile) => void
}

export const UploadList:FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  const handleRemove = function(file: UploadFile){
    onRemove(file);
  }
  // setTimeout(()=> {
  //   setFiles((preFiles) => {
  //     return preFiles.map(pre => {
  //        if(pre.status === 'loading'){
  //         pre.percentage = (pre.percentage || 0) + 10;
  //         if(pre.percentage >= 100) {
  //          pre.percentage = 100;
  //          pre.status = "success";
  //         }
  //        }
  //        return pre;
  //     })
  //   });
  // }, 500)
  return (
    <ul className="upload-list">
      {
        fileList.map(item => {
          return (
            <li className="upload-list-item" key={item.uid}>
              <div>
                <Icon className="file-icon" icon="file-alt" theme="secondary" />
                <span className={ `file-name  file-name-${item.status}`}>
                  {item.name}
                </span>
                <span className="file-status">
                  {item.status === 'loading' && <Icon icon="spinner" spin theme="primary"/>}
                  {item.status === 'error' && <Icon icon="times-circle"  theme="danger"/>}
                  {item.status === 'success' && <Icon icon="check-circle" theme="success"/>}
                </span>
                <span className="file-action">
                  <Icon icon="times" onClick={() => {handleRemove(item)}} />
                </span>
              </div>
              { item.status === 'loading' && <Progress  percent={item.percentage || 0} />}
              
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList;