import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
// import * as slug from 'remark-slug';
import HeadingRenderer from '@/components/HeadingRenderer';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const renderers = {
  tableRender(props){
    return (
      <div className="table-responsive">
        <table>{props.children}</table>
      </div>
    )
  },
  code: ({language, value}) => {
    return (
      <SyntaxHighlighter style={a11yDark} language={language} children={value} />
    )
  }
}

export default ({content}) => {
  return (
    <ReactMarkdown        
      className='markdown-body'
      plugins={[gfm]} 
      renderers={{
        'heading': HeadingRenderer,
        ...renderers
      }}
      children={content} 
    />
  )
}