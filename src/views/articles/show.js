import { useAuth } from '@/hook/useAuth';
import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import Comment from './components/Comment';
import Loading from '@/components/Loading';
import { Typography, Divider, Space, Avatar, Button, Drawer } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { MessageOutlined, LikeOutlined, ReadOutlined, FieldTimeOutlined, BarsOutlined  } from '@ant-design/icons';
import avatar from '@/images/avatar.jpg';
import moment from 'moment';
import MarkdownShow from '@/components/MarkdownShow';
// import markMenu from '@/utils/markMenu';

export default observer(() => {
  const { article } = useStore();
  const { id } = useParams()
  const { user } = useAuth();
  const match = useRouteMatch()
  const [ menuVisible, setMenuVisible] = useState(false)
  
  useEffect(() => {
    article.fetchSource(id);
  }, [])
  
  console.log('article', article)
  function generateMenu(data){
    return (function walk(list){
      return(
        <ul>
          {list.map(item => {
            return (
              <li>
                <a href={`#${item.data.id}`}>{item.value}</a>
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

  if(article.state === 'pending'){
    return <Loading/>
  }

  if(article.state === 'error'){
    return <div className='error'>error...</div>
  }

  return (
    <div className="article_show">
      <Typography>
        <Title level={3}>{article.detail.title}</Title>
        <div className='author'>
          <Avatar size={36} src={avatar} />
          <ul>
            <li>
              <Link className="author-name" to={'/users/' + article.detail.author._id}>{article.detail.author.username}</Link>
            </li>
            <li>
              <Space>
                <FieldTimeOutlined />
                {moment(article.detail.createdAt).format('YYYY年MM月DD日')}
              </Space>
              <Space>
                <ReadOutlined />
                {article.detail.meta.view}
              </Space>
            </li>
          </ul>
        </div>

        <Paragraph className='content'>
          <MarkdownShow content={article.detail.content}/>
        </Paragraph>

        <div className='meta'>    
          <div className='meta-data'>           
            <Space>
              <LikeOutlined/>
              {article.detail.meta.like}
            </Space>
          </div>    

          {
            user &&
            <ul>
              <li>
                <Link to={`${match.url}/edit`}>编辑</Link>
              </li>
              <li>
                <a onClick={() => article.delete(id)}>删除</a>
              </li>
            </ul>
          } 
        </div>        
      </Typography>

      <Button
        size='large'
        className="meta_info-btn"
        shape="circle"
        onClick={() => setMenuVisible(true)}
        icon={<BarsOutlined />}
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



      

      {/* <h2>评论列表</h2>
      <span>共{article.detail.commentCount}条评论</span>      
      {
        !article.detail.commentCount ? (
          <div>暂无评论</div>
        ) : article.detail.comments.map(item => (
          <Comment key={item._id} comment={item}></Comment>  
        ))
      } */}
    </div>
  )
})