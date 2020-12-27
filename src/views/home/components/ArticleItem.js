import { observer } from 'mobx-react';
import React from 'react';

export default observer(({article}) => {
  return(
    <div>
      <b>{article.title}</b>
      <p>{article.content}</p>
      <p>{article.user && article.user.name}</p>
    </div>
  )
})