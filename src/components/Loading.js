import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

export default ({text}) => {
  return (
    <div className='loading'>
      <LoadingOutlined />
      {text || '加载中，请稍微...' }
    </div>
  )
}
