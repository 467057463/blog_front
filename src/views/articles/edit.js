import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { useStore } from '@/hook/useStore';
import { Form, Button, Input } from 'antd';

import MarkdownShow from '@/components/MarkdownShow';
import CoderEditor from '@/components/CoderEditor';
import { EditOutlined, FileSearchOutlined, SaveOutlined } from '@ant-design/icons';

export default observer(()=> {
  const [ isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { article } = useStore();
  const { params } = useRouteMatch();

  
  useEffect(async ()=> {
    if(params.id){
      const res = await article.fetchSource(params.id);
      setTitle(res.data.title);
      setContent(res.data.content);
    }
  }, [])

  useEffect(() => {
    const height = window.innerHeight - 90 + 'px'
    document.querySelector('.CodeMirror').style.height = height;
  }, [])

  function submit(event){
    const data = {
      title,
      content
    }
    event.preventDefault();
    if(params.id){
      article.update(params.id, data)
    }else{
      article.create(data)
    }
  }

  return(
    <div className='article-edit'>
      <Form onSubmit={submit}>
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
            <div className='prview-wrapper'>
              <MarkdownShow content={content}/>
            </div>
        }     

        <Button 
          className="prview-btn"
          type="primary" 
          shape="circle"
          onClick={() => {setIsEdit(!isEdit)}} 
          icon={
            !isEdit ? <EditOutlined /> : <FileSearchOutlined />
          }
        />

        <Button  
          className="save-btn"
          type="primary" 
          shape="circle"
          htmlType="submit"
          icon={<SaveOutlined />}
        />
      </Form>     
    </div>
  )
})