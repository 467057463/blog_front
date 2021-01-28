import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/hook/useStore';
import { List, Avatar, Space, Image  } from 'antd';
import { MessageOutlined, LikeOutlined, ReadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loading from '@/components/Loading';
import avatar from '@/images/avatar.jpg';
import exartImage from '@/images/2020.jpg';
import Time from "@/components/Time";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default observer(()=>{
  const { articles } = useStore();

  useEffect(()=>{
    articles.fetchArticles();
  }, [])

  
  if(articles.state === 'pending'){
    return <Loading/>
  }

  if(articles.state === 'error'){
    return <div className='error'>error...</div>
  }

  return(
    <div className='home'>
      {
        articles.list.map(item => <ArticleItem key={item._id} article={item}/>)
      }
      {/* <List
        itemLayout="vertical"
        size="large"        
        dataSource={articles.list}
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={
              <Image
                preview={false}
                height={100}
                width={150}
                alt="logo"
                src={exartImage}
              />
            }
            actions={[
              <IconText icon={ReadOutlined} text={item.meta.view} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.meta.like} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={item.comments.length} key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={46} src={avatar} />}
              title={<Link to={`/articles/${item._id}`}>{item.title}</Link>}
              description={<Time prefix={<span style={{marginRight: '5px'}}>m2</span>} time={item.createdAt} suffix="发布"/>}
            />
            <p className="content">{item.describe}</p>
          </List.Item>
        )}
      />         */}
    </div>
  )
})


