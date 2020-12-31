import { useAuth } from '@/hook/useAuth';
import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import Comment from './components/Comment';

export default observer(() => {
  const { article } = useStore();
  const { id } = useParams()
  const { user } = useAuth();
  const match = useRouteMatch()
  
  useEffect(() => {
    article.fetchSource(id);
  }, [])

  if(article.state === 'pending'){
    return <div className='loading'>loading...</div>
  }

  if(article.state === 'error'){
    return <div className='error'>error...</div>
  }

  return (
    <div className="article_show">
      <h1>{article.detail.title}</h1>
      <ul>
        {/* {
          user &&
          <li>
            <a onClick={() => article.like(id)}>点赞</a>
          </li>
        }   */}
        {
          user &&
          <>
            <li>
              <Link to={`${match.url}/edit`}>编辑</Link>
            </li>
            <li>
              <a onClick={() => article.delete(id)}>删除</a>
            </li>
          </>
        }        
      </ul>

      <div className="meta-info">
        <Link to={'/users/' + article.detail.author._id}>{article.detail.author.username}</Link>
        {/* <span>评论：{article.detail.commentCount}</span> */}
        <span>浏览：{article.detail.meta.view}</span>
        {/* <span>点赞：{article.detail.meta.like}</span> */}
        <span>发布时间：{article.detail.createdAt}</span>
      </div>
      <p>{article.detail.content}</p>
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