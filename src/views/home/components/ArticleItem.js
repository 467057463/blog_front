import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '@/images/avatar.jpg';
import exartImage from '@/images/2020.jpg';

import { 
  List, 
  Avatar, 
  Space, 
  Image  
} from 'antd';

export default observer(({article}) => {
  return(
    <div className="article-item">
      <div className="article-header">
        <Avatar size={20} src={avatar} />
        <Link className='user-name' to={'/users/' + article.author._id}>{article.author.username}</Link>
      </div>
      <div className="article-body">
        <Image
          preview={false}
          height={70}
          width={70}
          src={exartImage}
        />
        <Link className="article-title" to={'/articles/' + article._id}>{article.title}</Link>
        <p className="content">{article.describe}</p>
      </div>      
      <div className="meta-info">
        <span>评论：{article.commentCount}</span>
        <span>浏览：{article.meta.view}</span>
        <span>点赞：{article.meta.like}</span>
      </div>
    </div>
  )
})