import { useAuth } from '@/hook/useAuth';
import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import Comment from './components/Comment';
import Loading from '@/components/Loading';
import { Typography, Divider, Space, Avatar } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { MessageOutlined, LikeOutlined, ReadOutlined } from '@ant-design/icons';
import avatar from '@/images/avatar.jpg';
import moment from 'moment';

export default observer(() => {
  const { article } = useStore();
  const { id } = useParams()
  const { user } = useAuth();
  const match = useRouteMatch()
  
  useEffect(() => {
    article.fetchSource(id);
  }, [])

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
            <li><Link className="author-name" to={'/users/' + article.detail.author._id}>{article.detail.author.username}</Link></li>
            <li>发布于：{moment(article.detail.createdAt).format('YYYY年MM月DD日')}</li>
          </ul>
        </div>

        <div className='meta'>    
          <div className='meta-data'>
            <Space>
              <ReadOutlined/>
              {article.detail.meta.view}
            </Space>
            <Space>
              <LikeOutlined/>
              {article.detail.meta.like}
            </Space>
            <Space>
              <MessageOutlined/>
              {article.detail.comments.length}
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

  


      
      <Paragraph className='content'>{article.detail.content}</Paragraph>

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