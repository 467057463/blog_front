import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default observer(({article}) => {
  return(
    <div>
      <Link to={'/articles/' + article._id}>{article.title}</Link>
      <p>{article.content}</p>
      <div className="meta-info">
        <Link to={'/users/' + article.author._id}>{article.author.username}</Link>
        <span>评论：{article.commentCount}</span>
        <span>浏览：{article.meta.view}</span>
        <span>点赞：{article.meta.like}</span>
      </div>
    </div>
  )
})