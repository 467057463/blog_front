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
  Drawer,
  Tree
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
import markMenu from '@/utils/markMenu';

import avatar from '@/images/avatar.jpg';
import moment from 'moment';
const { Title, Paragraph, Text } = Typography;
import IconFont from '@/components/IconFont';

function setCodeHeight(){
  const height = window.innerHeight - 90 + 'px'
  document.querySelector('.CodeMirror').style.height = height;
}

export default observer(()=> {
  const [ isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [menu, setMenu] = useState([]);
  const [ menuVisible, setMenuVisible] = useState(false)
  const { article } = useStore();
  const { params } = useRouteMatch();
  const { user } = useAuth();
  
  useEffect(async ()=> {
    if(params.id){
      const res = await article.fetchSource(params.id);
      setTitle(res.data.title);
      changeContent(res.data.content);
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

  function changeContent(content){
    setMenu(markMenu(content))
    setContent(content);
  }

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

  function generateMenu(data){
    return (function walk(list){
      return(
        <ul>
          {list.map(item => {
            return (
              <li>
                <a href={`#${item.data.id}`}>{item.value}</a>
                { 
                  item.children && item.children.length > 0 &&
                  walk(item.children)
                }
              </li>
            )
          })}
        </ul>
      )
    })(data)    
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
              <CoderEditor content={content} setContent={changeContent}/> 
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

              <Button
                size='large'
                className="menu-btn"
                shape="circle"
                onClick={() => setMenuVisible(true)}
                icon={<IconFont type='fi-zhankai'/>}
              />

              <Drawer
                title="文章目录"
                placement="right"
                closable={false}
                onClose={() => setMenuVisible(false)}
                visible={menuVisible}
              >
                <div className='menu'>
                  {generateMenu(menu)}
                </div>       
              </Drawer>      

            </div>
        }     

        <div className='actions-wrapper'>
          <div className='action-item' onClick={() => {setIsEdit(!isEdit)}} >
            {
              !isEdit ? <EditOutlined /> : <FileSearchOutlined />
            }
            {
              !isEdit ? <span>编辑</span> : <span>预览</span>
            }
          </div>

          <div className='action-item'>
            <IconFont type='fi-menu'/>
            <span>文章信息</span>
          </div>

          <div className='action-item' onClick={submit}>
            <SaveOutlined />
            <span>保存</span>
          </div>

        </div>

        {/* <Button
          size='large'
          className="info-btn"
          shape="circle"
          onClick={() => console.log('ssss')} 
          icon={<IconFont type='fi-menu'/>}
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
        /> */}
      </Form>
    </div>
  )
})