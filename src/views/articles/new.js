import { useStore } from '@/hook/useStore';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

export default observer(()=> {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { article } = useStore();

  function submit(event){
    event.preventDefault();
    article.create({
      title,
      content
    })
  }

  return(
    <div className='articles-new'>
      <b>发布文章</b>
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
        <button type="submit">提交</button>
      </form>
    </div>
  )
})