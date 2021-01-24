import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useAuth } from '@/hook/useAuth';
import { 
  Link, 
  useParams, 
  useRouteMatch 
} from 'react-router-dom';
import { 
  Typography, 
  Divider, 
  Space, 
  Avatar, 
  Button, 
  Drawer 
} from 'antd';
const { 
  Title, 
  Paragraph, 
  Text 
} = Typography;
import { 
  MessageOutlined, 
  LikeOutlined, 
  ReadOutlined, 
  FieldTimeOutlined, 
  BarsOutlined  
} from '@ant-design/icons';
import avatar from '@/images/avatar.jpg';
import MarkdownShow from '@/components/MarkdownShow';
import IconFont from '@/components/IconFont';

const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName);
    if(anchorElement) { 
      anchorElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      }); 
    }
  }
}

function generateMenu(data){
  return (function walk(list){
    return(
      <ul>
        {list.map(item => {
          return (
            <li key={item.data.id}>
              <a onClick={()=> scrollToAnchor(item.data.id)}>{item.value}</a>
              { 
                item.children && item.children.length > 0 &&
                walk(item.children)
              }
            </li>
          )
        })}
      </ul>
    )
  })(data)    
}


export default observer(({article, isPrview}) => {
  const { user } = useAuth();
  const match = useRouteMatch();
  const [ menuVisible, setMenuVisible] = useState(false)
  // useEffect(()=>{
  //   document.addEventListener('click', function(event){
  //     const menu = Array.prototype.slice.call(document.querySelectorAll('.menu a'))
  //     if(menu.includes(event.target)){
  //       console.log(event.target)
  //       event.preventDefault()
  //     }
  //   }, false)
  // }, [])

  return(
    <div className="article-show">
      <Typography>
        <Title>{article.detail.title || '请输入文章标题'}</Title>
        
        <div className='author'>
          <Avatar size={36} src={avatar} />
          <ul>
            <li>
              <Link className="author-name" to={'/users/' + (!isPrview ? article.detail.author._id : user._id)}>{!isPrview ? article.detail.author.username : user.name}</Link>
            </li>
            <li>
              <Space>
                <FieldTimeOutlined />
                {moment(!isPrview ? article.detail.createdAt : Date.now()).format('YYYY年MM月DD日')}
              </Space>
              <Space>
                <ReadOutlined />
                {!isPrview ? article.detail.meta.view : 0}
              </Space>
            </li>
          </ul>
        </div>

        <Paragraph className='content'>
          <MarkdownShow content={article.detail.content || '请添加文章内容'}/>
        </Paragraph>

        <div className='meta'>    
          <div className='meta-data'>           
            <Space>
              <LikeOutlined/>
              {!isPrview ? article.detail.meta.like : 0}
            </Space>
          </div>    

          {
            user && !isPrview &&
            <ul>
              <li>
                <Link to={`${match.url}/edit`}>编辑</Link>
              </li>
              <li>
                <a onClick={() => article.delete(article.detail._id)}>删除</a>
              </li>
            </ul>
          } 
        </div>
      </Typography>

      <Button
        size='large'
        className="menu-btn"
        shape="circle"
        type="primary"
        onClick={() => setMenuVisible(true)}
        icon={<IconFont type='fi-zhankai'/>}
      />

      <Drawer
        title="文章目录"
        placement="right"
        closable={false}
        onClose={() => setMenuVisible(false)}
        visible={menuVisible}
      >
        <div className='menu'>
          {generateMenu(article.detail.menu)}
        </div>       
      </Drawer>
    </div>
  )
})