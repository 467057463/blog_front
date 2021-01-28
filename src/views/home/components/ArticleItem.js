import { observer } from 'mobx-react';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import avatar from '@/images/avatar.jpg';
import exart01 from '@/images/exart_01.jpg';
import exart02 from '@/images/exart_02.jpg';
import exart03 from '@/images/exart_03.jpg';
import exart04 from '@/images/exart_04.jpg';
import exart05 from '@/images/exart_05.jpg';

import { 
  List, 
  Avatar, 
  Space, 
  Image  
} from 'antd';
import { 
  MessageOutlined, 
  LikeOutlined, 
  ReadOutlined 
} from '@ant-design/icons';

const images = [exart01, exart02, exart03, exart04, exart05]

const imgUrl = (() => {
  let i = -1;
  return() => {
    i++;
    if(i < images.length){
      return images[i]
    }else{
      return "";
    }
  }  
})()

export default observer(({article}) => {
  const history = useHistory();

  const url = imgUrl();
  return(
    <div className="article-item" onClick={() => history.push(`/articles/${article._id}`)}>
      <div className="article-header">
        <Avatar size={20} src={avatar} />
        <Link className='user-name' to={'/users/' + article.author._id}>{article.author.username}</Link>
      </div>
      <div className="article-body">
        {url && <Image
          preview={false}
          height={70}
          width={70}
          src={url}
        />}
        <Link className="article-title" to={'/articles/' + article._id}>{article.title}</Link>
        <p className="content">{article.describe}</p>
      </div>      
      <div className="meta-info">
        <span>
          <ReadOutlined/>
          {article.commentCount}
          </span>
        <span>
          <LikeOutlined/>
          {article.meta.view}
        </span>
        <span>
          <MessageOutlined/>
          {article.meta.like}
        </span>
      </div>
    </div>
  )
})