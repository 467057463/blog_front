import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/hook/useStore';


export default observer(()=>{
  const { articles } = useStore();

  useEffect(()=>{
    articles.fetchArticles();
  }, [])

  
  if(articles.state === 'pending'){
    return <div className='loading'>loading...</div>
  }

  if(articles.state === 'error'){
    return <div className='error'>error...</div>
  }

  return(
    <div className='home'>
      
      {articles.list.map(item => (
        <ArticleItem key={item._id} article={item}/>
      ))}
      <span>共{articles.count}数据</span>
    </div>
  )
})


