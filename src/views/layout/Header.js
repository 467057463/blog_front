import { useAuth } from '@/hook/useAuth';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
const { Header } = Layout;
import { BarsOutlined, CloseOutlined } from '@ant-design/icons';
import Logo from '@/images/logo.png';

export default observer(({collapsed, setCollapsed}) => {
  const { user, logout } = useAuth();

  return(
    <Header className="header">
      <span onClick={() => setCollapsed(!collapsed)}>
        { collapsed ? <BarsOutlined /> : <CloseOutlined />}
      </span>
      <Link to='/'><img className='logo' src={Logo}/></Link>

      { user
        ? (
            <ul>
              <li><Link to={'/users/' + user._id}>{user.name}</Link></li>
              <li><Link to="/articles/new">发布文章</Link></li>
              <li onClick={()=> logout()}>退出登录</li>
            </ul>
          )
        : (
            <div>
              没有登录
              <Link to="/login">登录</Link>
            </div>
          )
      }
    </Header>
  )
})