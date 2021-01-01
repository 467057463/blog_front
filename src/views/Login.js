import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useAuth } from '@/hook/useAuth';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default observer(() => {
  const { auth } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submit(values){
    // console.log(values)
    // event.preventDefault();
    // console.log(username, password);
    auth.login(values)
  }

  return (
    <div className='login'>
      <Form onFinish={submit}>
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
        
        {/* <label>用户名：</label>
        <input type="text" value={username} name="username" onChange={(event)=>setUsername(event.target.value)}/>
        <label>密码：</label>
        <input type="password" value={password} name="password" onChange={(event)=>setPassword(event.target.value)}/>

        <button type="submit">登录</button> */}
      </Form>
    </div>
)});
