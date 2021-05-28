import React from 'react'
import classNames from 'classnames'
export enum ButtonSize{
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType{
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps{
  className?: string;
  disabled?: boolean;
  size?: string;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type NativeAnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  }  = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: (btnType === ButtonType.Link) && disabled
  });

  if(btnType === ButtonType.Link && href){
    return (
      <a {...restProps} className={classes} href={href}>
        {children}
      </a>
    )
  }else{
    return (
      <button {...restProps} className={classes}
      disabled={disabled}>
          {children}
      </button>
    )
  }
} 

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
  size: ButtonSize.Small
}
export default Button;