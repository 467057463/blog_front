import { useAuth } from '@/hook/useAuth';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Avatar, Drawer } from 'antd';
const { Header } = Layout;
import { EditOutlined, ImportOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '@/images/logo.png';
import avatar from '@/images/avatar.jpg';


export default observer(({collapsed, setCollapsed}) => {
  const { user, logout } = useAuth();

  const [visible, setVisible] = useState(false);



  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  function handleLogout(){
    setVisible(false);
    logout()
  }

  return(
    <Header the className="header">    
      <div className="header-title">首页</div>

      <div className="header-wrap">
        <Link to='/'><img className='logo' src={Logo}/></Link>

        <div className="right-actions">
          { user
            ? (             
                <Avatar onClick={showDrawer} size={28} src={avatar}/>
              )
            : (
                <Link to="/login"><UserOutlined/></Link>
              )
          }
          <div className="menu-btn">
            <MenuOutlined />
          </div>
        </div>
      </div>      
      {
        user && 
        <Drawer
          title="个人信息"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <ul style={{textAlign: 'center'}}>
            <li>
              <Link to={'/users/' + user._id}><Avatar size={100} src={avatar}/></Link>
            </li>
            <li style={{paddingTop: '5px'}}>
              {user.name}
            </li>
          </ul>

          <ul className="user-link">
            <li><EditOutlined /> <Link onClick={onClose} to="/articles/new">发布文章</Link></li>
            <li onClick={handleLogout}><ImportOutlined />退出登录</li>
          </ul>
        </Drawer>
      } 
    </Header>
  )
})