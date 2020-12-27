import { observer } from 'mobx-react';
import React from 'react';

export default observer(({article}) => {
  return(
    <div key={article._id} onClick={() => article.setUser('1')}>
      <b>{article.title}</b>
      <p>{article.content}</p>
      <p>{article.user && article.user.name}</p>
    </div>
  )
})