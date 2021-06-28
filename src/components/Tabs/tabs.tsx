import React, { FC, createContext, useState, FunctionComponentElement, ReactNode, cloneElement } from 'react'
import { TabItemProps } from './tabItem'
import classNames from 'classnames'

type onSelectCallback = (index: string) => void

type TabsType = 'default' | 'card' | 'border-card'
export interface TabsProps{
  type?: TabsType,
  defaultIndex?: string,
  className?: string,
  /**选中回调 onSelectCallback: (selectedIndex: String) => void */
  onSelect?: onSelectCallback
}

interface ItabsContext{
  activeIndex: string,
  onSelect?: onSelectCallback
}


const renderTabs = function(children: ReactNode, activeIndex: string){

  const headers:Array<FunctionComponentElement<TabItemProps>> = [];
  const conntents:Array<FunctionComponentElement<TabItemProps>> = [];
  React.Children.forEach(children, (child, index) => {
    const childElement = child as (FunctionComponentElement<TabItemProps>) ;
  
    if(childElement.type.name === 'TabItem' ){
      headers.push(cloneElement(childElement, {
        index: index.toString(),
        key: index.toString(),
      }))
      const contentItemClasses = classNames('tab-content-item', {
        'is-active': activeIndex === index.toString()
      });
      conntents.push(<div className={contentItemClasses} key={index}>{childElement.props.children}</div>);
    } else {
      console.error('Warning: Menu has a child which is not a MenuItem component')
    }
  })
  return {
    headers,
    conntents
  }
}
export const TabsContext = createContext<ItabsContext>({ activeIndex: '0' });
export const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, children, onSelect, className, type } = props;
  const classes = classNames('tabs', className, {
    'tabs-card': type === 'card',
    'tabs-border-card': type === 'border-card'
  });
  const [activeIndex, setIndex] = useState(defaultIndex as string);
  const handleSelect = (index: string) => {
    setIndex(index);
    onSelect && onSelect(index);
  }
  
  const passedTabsContext:ItabsContext = {
    activeIndex,
    onSelect: handleSelect
  }
  const { headers, conntents } = renderTabs(children, activeIndex);
  return (<div>
    <TabsContext.Provider value={passedTabsContext}>
      <div className= {classes}>
        <div className="tab-header-wrap">
          <ul className = 'tab-header'>{headers}</ul>
        </div>
        <div className='tab-content'>
          {conntents}
        </div>
      </div>
    </TabsContext.Provider>
    
  </div>)
}

Tabs.defaultProps = {
  type: 'default',
  defaultIndex: '0'
}

export default Tabs;