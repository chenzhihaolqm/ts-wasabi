import React, { FC, InputHTMLAttributes, FunctionComponentElement, useState, useEffect, useRef, ChangeEvent } from 'react';
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import Icon from '../Icon/icon'
import Input, { IuputProps } from '../Input/index'
import useDebonce from '../../hooks/useDebonce'
import useClickOutSide from '../../hooks/useClickOutSide'
import { renderIntoDocument } from '_@types_react-dom@17.0.5@@types/react-dom/test-utils';


type RenderFn = (item: any) => JSX.Element
type FilterFn = (value: string, data: Array<any>) => any[]

interface BaseAutocompleteProps{
  // data?: Array<any>,
  fetchData:  Array<any> | ((value: string) => Array<any> | Promise< Array<any>>)
  className?: string,
  renderItem?: RenderFn,
  filter?: FilterFn
}

type AutocompleteProps = BaseAutocompleteProps & Omit<IuputProps, 'className'>


const defaultFilter = (value: string, list: Array<any>) => {
  const filterList = list.filter(item => {
    if(item.value === undefined){
      console.log('props data item does not has prop [value]')
    }
    return (item.value || '').includes(value)
  })
  return filterList
}

const renderFilterSuggecionList = (list: Array<any>, hoverIndex: number, onSelect: (item: any) => void, renderItem: RenderFn | undefined) => {
  return list.map((item, index) => {
    const classes = classNames('item', {
      'is-hover': index === hoverIndex
    })
    let node;
    if(renderItem){
      try{
        node = renderItem(item);
      }catch(e){
        console.log('自定义渲染函数出错')
      }
    }
    return <li className={classes} key={index}  onClick={() => (onSelect(item))}>{
      node || item.value
    }</li> //
  })
}


export const Autocomplete: FC<AutocompleteProps> = (props) => {
  const { className, fetchData, value, renderItem, filter,  ...restProps } = props;
  const [inputVal, setValue] = useState(value);
  const debonceValue = useDebonce(inputVal, 300);
  const [suggestionList, setSuggestionList] = useState([] as any[]);
  const [hoverIndex, setHoverIndex] =  useState(-1);
  const triggerShow = useRef(false)
  const wrapperRef = useRef(null);
  useClickOutSide(wrapperRef, () => {
    setSuggestionList([]);
  })
  const changeInput = (value: string) => {
    setValue(value);
    triggerShow.current = true;
  }
  useEffect(() => {
    let toFilter = filter || defaultFilter;
    if(!debonceValue){
      setSuggestionList([]);
    } else {
      try{
        if(fetchData instanceof Array){
          let filterList = toFilter(debonceValue, fetchData);
          setSuggestionList(filterList);
        }else{
          let p = fetchData(debonceValue);
          if(p instanceof Array){
            setSuggestionList(p);
          }else{
            p.then(d => {
              setSuggestionList(d);
            })
          }
        }
        
      }catch(e){
        console.log('过滤函数出错',e)
      }
      
    }
  }, [debonceValue])

  const handleClickSuggectionItem = (item: any) => {
    setValue(item.value);
    setHoverIndex(-1);
    setSuggestionList([]);
    triggerShow.current = false;
  }
  
  const handleKeyUp = (event: React.KeyboardEvent<HTMLElement> ) => {
    // console.log(event)
    if(event.code === 'ArrowDown' && hoverIndex < suggestionList.length - 1){ // keyCode=40 
      setHoverIndex(hoverIndex + 1)
    }
    if(event.code === 'ArrowUp' && hoverIndex >= 0){ //keyCode=38
      setHoverIndex(hoverIndex - 1)
    }
    if(event.code === 'Enter' && hoverIndex >= 0){ //keyCode=13
      handleClickSuggectionItem(suggestionList[hoverIndex])
    }
    if(event.code === 'Escape'){ //
      setHoverIndex(-1);  //
      setSuggestionList([]);
    }
    
  }

  const listsTemplate = renderFilterSuggecionList(suggestionList, hoverIndex, handleClickSuggectionItem, renderItem)
  const classes = classNames('autocomplete', className, {
  })
  const showLis = triggerShow.current && listsTemplate.length;

  return (
    <div ref={wrapperRef} className={classes} >
      <Input {...restProps} value={inputVal} onChangeVal={changeInput} onKeyUp={handleKeyUp}></Input>
      {showLis ?
        <div className="suggestions">
          {listsTemplate}
        </div> : 
        ''
      }
    </div>
    )
}

Autocomplete.defaultProps = {

}

export default Autocomplete;
