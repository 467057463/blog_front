import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
// import * as slug from 'remark-slug';
import HeadingRenderer from '@/components/HeadingRenderer';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {pojoaque} from 'react-syntax-highlighter/dist/esm/styles/prism'

function tableRender(props){
  console.log(props)
  return (
    <div className="table-responsive">
      <table>{props.children}</table>
    </div>
  )
}
const renderers = {

  code: ({language, value}) => {
    return <SyntaxHighlighter style={pojoaque} language={language} children={value} />
  }
}

export default ({content}) => {
  return (
    <ReactMarkdown        
      className='markdown-body'
      plugins={[gfm]} 
      renderers={{'heading': HeadingRenderer, table: tableRender, ...renderers}}
      children={content} 
    />
  )
}