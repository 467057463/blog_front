import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch, useLocation, Prompt } from 'react-router-dom';
import { useStore } from '@/hook/useStore';
import { 
  Form, 
  Input, 
} from 'antd';
import { 
  EditOutlined, 
  FileSearchOutlined, 
  SaveOutlined, 
} from '@ant-design/icons';
import CoderEditor from '@/components/CoderEditor';
import markMenu from '@/utils/markMenu';
import IconFont from '@/components/IconFont';
import Article from './components/Article';


export default observer(()=> {
  const [isEdit, setIsEdit] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [menu, setMenu] = useState([]);
  const [isBlocking, setIsBlocking] = useState(false);
  const { article, app } = useStore();
  const { params } = useRouteMatch();
  const location = useLocation();
  
  useEffect(async ()=> {
    if(params.id){
      const res = await article.fetchSource(params.id);
      setTitle(res.data.title);
      changeContent(res.data.content);
      app.setTitle({
        name: "编辑文章",
        icon: 'back'
      })
    }else{
      setTitle("")
      changeContent("")
      setIsEdit(true)
      app.setTitle({
        name: "发布文章",
        icon: 'back'
      })
    }
  }, [location])

  function changeContent(content){
    setMenu(markMenu(content))
    setContent(content);
  }

  function submit(){
    const data = {
      title,
      content
    }
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
            <>
              <Input 
                className='title-input'
                size="large" 
                placeholder="文章标题" 
                value={title}
                onChange={(event)=>setTitle(event.target.value)}
              />
              <CoderEditor content={content} setContent={changeContent}/> 
            </>
          :
            <div className="article-prview">    
              <Article 
                article={{
                  detail: {
                    title,
                    content,
                    menu
                  }
                }} 
                isPrview={true} 
              />
            </div>
        }
      </Form>
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
    </div>
  )
})