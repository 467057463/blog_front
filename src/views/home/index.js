import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import { useRouteMatch, useLocation, Prompt } from 'react-router-dom';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/hook/useStore';
import { List, Avatar, Space, Image  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from '@/components/Loading';
import avatar from '@/images/avatar.jpg';
import Time from "@/components/Time";

export default observer(()=>{
  const { articles } = useStore();
  const location = useLocation();

  useEffect(()=>{
    return () => {
      articles.reset();
    }
  }, [])

  // useEffect(()=>{
  //   articles.fetchArticles();
  // }, [])

  function loadFunc(page){
    articles.fetchArticles(page);
  }

  // if(articles.state === 'pending'){
  //   return <Loading/>
  // }

  // if(articles.state === 'error'){
  //   return <div className='error'>error...</div>
  // }
  const hasMore = articles.state === 'pending' || articles.page * articles.quantity < articles.count
  return(
    <div className='home'>
      <InfiniteScroll
        pageStart={articles.page}
        loadMore={loadFunc}
        hasMore={hasMore}
        loader={
          <div  className="loadmore" key={0}>
            {
              articles.state !== 'pending' && 
              <>
                <LoadingOutlined/>
                加载中 ...
              </>
            }            
          </div>
        }
      >
        {
          articles.state === 'pending' && <Loading/>
        }
        {
          articles.list.map((item, index) => <ArticleItem key={item._id} article={item} index={index}/>)
        }
        {
          !hasMore && <div className="nomore">没有更多了...</div>
        }
      </InfiniteScroll>
    </div>
  )
})


