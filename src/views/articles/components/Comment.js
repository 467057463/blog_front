import { observer } from "mobx-react";
import React from 'react';
import { Link } from "react-router-dom";

export default observer(({comment}) => (
  <div className="comment-item">
    <div className="author">
      <Link to={'/users/' + comment.author._id}>{comment.author.username}</Link>
    </div>
    <p>{comment.content}</p>
    <span>{comment.createdAt}</span>
  </div>
))