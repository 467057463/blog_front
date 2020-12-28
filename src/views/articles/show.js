import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React from 'react';

export default observer(() => {
  const { article } = useStore();

  if(article.state === 'pending'){
    return <div className='loading'>loading...</div>
  }

  if(article.state === 'error'){
    return <div className='error'>error...</div>
  }

  return (
    <div className="article_show">article_show</div>
  )
})