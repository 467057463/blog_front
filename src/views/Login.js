import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useAuth } from '@/hook/useAuth';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default observer(() => {
  const { auth } = useStore();

  function submit(values){
    auth.login(values)
  }

  return (
    <div className='login'>
      <Form size='large' onFinish={submit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入账号',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>     
      </Form>
    </div>
)});
