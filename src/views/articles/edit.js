import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

export default observer(() => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { article } = useStore();
  const { params } = useRouteMatch();


  useEffect(async ()=> {
    const res = await article.fetchSource(params.id);
    setTitle(res.data.title);
    setContent(res.data.content);
  }, [])

  function submit(event){
    event.preventDefault();
    article.update(params.id, {
      title,
      content
    })
  }

  return(
    <div className='articles-edit'>
      <b>编辑文章</b>      
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

        <div>
          <label>内容：</label>
          <textarea 
            name="content"
            onChange={(event)=>setContent(event.target.value)}
            value={content}
          ></textarea>
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  )
})