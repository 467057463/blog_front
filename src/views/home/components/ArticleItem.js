import { observer } from 'mobx-react';
import React from 'react';

export default observer(({article}) => {
  return(
    <div key={article._id}>
      <b>{article.title}</b>
      <p>{article.content}</p>
    </div>
  )
})