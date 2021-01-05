import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useStore } from '@/hook/useStore';
import { useAuth } from '@/hook/useAuth';


import { 
  Form, 
  Button, 
  Input, 
  Typography, 
  Avatar, 
  Space,
  Drawer 
} from 'antd';
import { 
  EditOutlined, 
  FileSearchOutlined, 
  SaveOutlined, 
  LikeOutlined, 
  ReadOutlined, 
  FieldTimeOutlined, 
  BarsOutlined 
} from '@ant-design/icons';

import MarkdownShow from '@/components/MarkdownShow';
import CoderEditor from '@/components/CoderEditor';

import avatar from '@/images/avatar.jpg';
import moment from 'moment';
const { Title, Paragraph, Text } = Typography;

function setCodeHeight(){
  const height = window.innerHeight - 90 + 'px'
  document.querySelector('.CodeMirror').style.height = height;
}

export default observer(()=> {
  const [ isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ metaVisible, setMetaVisible] = useState(false)
  const { article } = useStore();
  const { params } = useRouteMatch();
  const { user } = useAuth();
  
  useEffect(async ()=> {
    if(params.id){
      const res = await article.fetchSource(params.id);
      setTitle(res.data.title);
      setContent(res.data.content);
    }
  }, [])

  useEffect(() => {
    setCodeHeight()
    window.onresize = function(){
      setCodeHeight()
    }
    return () => {
      window.onresize = null;
    }
  }, [])

  function submit(){
    const data = {
      title,
      content
    }
    // event.preventDefault();
    if(params.id){
      article.update(params.id, data)
    }else{
      article.create(data)
    }
  }

  return(
    <div className='article-edit'>
      <Form onFinish={submit}>
        {
          isEdit ? 
            <div className='edit-wrapper'>
              <Input 
                className='title-input'
                size="large" 
                placeholder="文章标题" 
                value={title}
                onChange={(event)=>setTitle(event.target.value)}
              />
              <CoderEditor content={content} setContent={setContent}/> 
            </div>
          :
            <div className='prview-wrapper article_show'>
              <Typography>
                <Title level={3}>{title || '你还没有输入文章标题'}</Title>
                <div className='author'>
                  <Avatar size={36} src={avatar} />
                  <ul>
                    <li>
                      <Link className="author-name" to='#'>{user.name}</Link>
                    </li>
                    <li>
                      <Space>
                        <FieldTimeOutlined />
                        {moment().format('YYYY年MM月DD日')}
                      </Space>
                      <Space>
                        <ReadOutlined />
                        0
                      </Space>
                    </li>
                  </ul>
                </div>

                <Paragraph className='content'>
                  <MarkdownShow content={content || '你还没有输入文章内容'}/>
                </Paragraph>

                <div className='meta'>    
                  <div className='meta-data'>           
                    <Space>
                      <LikeOutlined/>
                      0
                    </Space>
                  </div>    
                </div>                
              </Typography>
            </div>
        }     

        <Button
          size='large'
          className="meta_info-btn"
          shape="circle"
          onClick={() => setMetaVisible(true)}
          icon={<BarsOutlined />}
        />
        <Button 
          size='large'
          className="prview-btn"
          type="primary" 
          shape="circle"
          onClick={() => {setIsEdit(!isEdit)}} 
          icon={
            !isEdit ? <EditOutlined /> : <FileSearchOutlined />
          }
        />

        <Button  
          size='large'
          className="save-btn"
          type="primary" 
          shape="circle"
          htmlType="submit"
          icon={<SaveOutlined />}
        />
      </Form>     
      
      <Drawer
        title="设置文章相关信息"
        placement="right"
        closable={false}
        onClose={() => setMetaVisible(false)}
        visible={metaVisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>      
    </div>
  )
})