import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, RenderResult, waitFor } from '@testing-library/react'
// import Button, { ButtonSize, ButtonType, ButtonProps } from './button'
import {Upload, UploadProps, UploadFile } from './index'


jest.mock('../Icon/icon', () => {
  return ({icon, onClick}) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onRemove: jest.fn()
}

const testFile = new File(['xyz'], 'test.png', { type: 'image/png'});
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click To Upload</Upload>);
    fileInput = wrapper.container.querySelector('.file-input') as HTMLInputElement;
    uploadArea = wrapper.queryByText('Click To Upload') as HTMLElement;

  })
  it('upload process should work fine', async () => {
    mockedAxios.post.mockImplementation(() => {
      return Promise.resolve({ data: 'cool' })
    })
    // mockedAxios.post.mockResolvedValue({ data: 'cool' });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile]}})

    await waitFor(() => {
      expect( wrapper.queryByText('file')).toBeInTheDocument()
    })

    // test uplpad success
    expect( wrapper.queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile
    }));
    expect(testProps.onSuccess).toHaveBeenCalled();

    // test remove
    const ele = wrapper.queryByText('times')
    expect(ele).toBeInTheDocument();
    ele && fireEvent.click(ele);
    expect(testProps.onRemove).toHaveBeenCalled();
    expect( wrapper.queryByText('file')).not.toBeInTheDocument()
  })
})