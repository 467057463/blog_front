import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/hook/useStore';

export default observer(()=>{
  const store = useStore();
  const { articles } = store;
  useEffect(()=>{
    console.log('this is effect hook')
    return () => {
      console.log('clean up.....')
    }
  })
  console.log(articles)
  return(
    <div className='home'>
      {Array.from(articles.list.entries()).map(item => (
        <ArticleItem key={item[0]} article={item[1]}/>
      ))}
      <span onClick={() => articles.addArticle(String(Date.now()), 'daf')}>共{articles.count}数据</span>
    </div>
  )
})


