import React from 'react'
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

interface BaseTransitionProps{
  animation?: AnimationName,
  wrapper? : boolean
}

// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName,
//   wrapper? : boolean,
// }
export type TransitionProps = Partial<BaseTransitionProps & CSSTransitionProps>


const Transition= (props: any) => {
  const { wrapper, animation, classNames, children, ...restProps  } = props;
  return (<CSSTransition classNames = { classNames ? classNames : animation} 
    {...restProps} >
    {wrapper ? <div>{children}</div> : children}
  </CSSTransition>)
}

Transition.defaultProps = {
  animation: 'zoom-in-top',
  unmountOnExit: true,
  appear: true,
}

export default Transition;