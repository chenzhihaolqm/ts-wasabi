import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'test',
  onSelect: jest.fn()
}
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  className: 'test-ver',
  onSelect: jest.fn()
}
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >active</MenuItem>
      <MenuItem  disabled>disabled</MenuItem>
      <MenuItem>英语</MenuItem>
    </Menu>
  );
}

let wrapper, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.getElementsByTagName('li').length).toBe(3);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  })

  it('click items should change active and call the right callback', () => {
    const thirdElement = wrapper.getByText('英语');
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass('menu-item is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    expect(activeElement).not.toHaveClass('menu-item is-active');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('3');

  })
})

describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testVerProps));
    menuElement = wrapper.getByTestId('test-menu');
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu menu-vertical');
  })
})