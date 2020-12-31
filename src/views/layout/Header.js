import { useAuth } from '@/hook/useAuth';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default observer(() => {
  const { user, logout } = useAuth();

  return(
    <div className="header">
      <ul>
        <li><Link to="/">首页</Link></li>
      </ul>
      { user
        ? (
            <ul>
              <li><Link to={'/users/' + user._id}>{user.username}</Link></li>
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
    </div>
  )
})