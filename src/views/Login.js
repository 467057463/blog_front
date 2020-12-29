import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useAuth } from '@/hook/useAuth';
import { useHistory } from 'react-router-dom';


export default observer(() => {
  const { login } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const history = useHistory();

  function submit(event){
    event.preventDefault();
    // console.log(username, password);
    login.login({
      username,
      password
    })
    auth.login({
      name: 'mm',
      _id: 'fdasfdsafds'
    }, function(){
      history.replace('/')
    })
  }

  return (
    <div className='login'>
      <form onSubmit={submit}>
        <label>用户名：</label>
        <input type="text" value={username} name="username" onChange={(event)=>setUsername(event.target.value)}/>
        <label>密码：</label>
        <input type="password" value={password} name="password" onChange={(event)=>setPassword(event.target.value)}/>

        <button type="submit">登录</button>
      </form>
    </div>
)});
