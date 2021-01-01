import React, { useEffect } from 'react';
import { values, observer } from 'mobx-react';
import ArticleItem from './components/ArticleItem';
import { useStore } from '@/hook/useStore';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, ReadOutlined } from '@ant-design/icons';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
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
    return <div className='loading'>loading...</div>
  }

  if(articles.state === 'error'){
    return <div className='error'>error...</div>
  }

  return(
    <div className='home'>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={articles.list}
        renderItem={item => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
            actions={[
              <IconText icon={ReadOutlined} text={item.meta.view} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={item.meta.like} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={item.comments.length} key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={avatar} />}
              title={<a>{item.title}</a>}
            />
            {item.content}
          </List.Item>
        )}
      />        
      {/* {articles.list.map(item => (
        <ArticleItem key={item._id} article={item}/>
      ))}
      <span>共{articles.count}数据</span> */}
    </div>
  )
})


