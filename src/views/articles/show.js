import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import Article from './components/Article';

export default observer(() => {
  const { article } = useStore();
  const { id } = useParams()
  
  useEffect(() => {
    article.fetchSource(id);
  }, [])


  if(article.state === 'pending'){
    return <Loading/>
  }

  if(article.state === 'error'){
    return <div className='error'>error...</div>
  }
  return (  
    <Article article={article} />
  )
})