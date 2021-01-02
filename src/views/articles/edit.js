import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { useStore } from '@/hook/useStore';

import MarkdownShow from '@/components/MarkdownShow';
import CoderEditor from '@/components/CoderEditor';


export default observer(()=> {
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
    <div className='article-form'>
      <form onSubmit={submit}>
        <div>
          <label>标题：</label>
          <input 
            type="text" 
            name="title"
            value={title}
            onChange={(event)=>setTitle(event.target.value)}
          />
        </div>
        <MarkdownShow content={content}/>
        <CoderEditor content={content} setContent={setContent}/> 
        <button type="submit">更新</button>
      </form>     
    </div>
  )
})