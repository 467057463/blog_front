import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import StoreContext from '@/hook/StoreContext';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/store';

export default observer(()=>{
  // const { articles } = useContext(StoreContext);
  const { articles } = useStore();
  console.log(articles)
  const article = {
    _id: '11111', 
    title: 'daf', 
    content: 'ssss'
  }
  return(
    <div className='home'>
      {articles.list.map(item => (
        <ArticleItem key={item._id} article={item}/>
      ))}
      <span onClick={() => articles.add(article)}>共{articles.count}数据</span>
    </div>
  )
})


