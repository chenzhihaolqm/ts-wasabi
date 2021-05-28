import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonSize, ButtonType, ButtonProps } from './button'

test('our first react test case', () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText('Nice');
  expect(element).toBeTruthy();
})

const defaultProps = {
  onClick:jest.fn()
}

const testProps:ButtonProps = {
  btnType:ButtonType.Primary,
  size:ButtonSize.Small,
  className:'test',
  onClick:jest.fn()
}

test('our second react test case', () => {
  const wrapper = render(<Button {...testProps}>Hello</Button>)
    const el = wrapper.getByText('Hello')
    expect(el).toBeInTheDocument()
    expect(el.tagName).toEqual('BUTTON')
    expect(el).toHaveClass('btn btn-primary')
    fireEvent.click(el)
    expect(testProps.onClick).toHaveBeenCalled()
})


test('our second react test case', () => {

  const testProps:ButtonProps = {
    btnType:ButtonType.Primary,
    size:ButtonSize.Large,
    disabled: true,
    onClick:jest.fn()
  }
  const wrapper = render(<Button {...testProps}>Hello</Button>)
    const el = wrapper.getByText('Hello')
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute('disabled')
    fireEvent.click(el)
    expect(testProps.onClick).toHaveBeenCalledTimes(0)
    
})