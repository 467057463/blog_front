import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/hook/useStore';

export default observer(()=>{
  const store = useStore();
  const { articles } = store;
  // console.log(articles.fetchArticles)
  // useEffect(()=>{
  //   articles.fetchArticles();
  //   // console.log('this is effect hook')
  //   // return () => {
  //   //   console.log('clean up.....')
  //   // }
  // }, [])
  // console.log(articles)
  return(
    <div className='home'>
      {articles.list.map(item => (
        <ArticleItem key={item._id} article={item}/>
      ))}
      <span onClick={() => articles.fetchArticles()}>共{articles.count}数据</span>
    </div>
  )
})


