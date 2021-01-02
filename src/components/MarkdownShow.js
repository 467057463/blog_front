import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderers = {
  code: ({language, value}) => {
    return <SyntaxHighlighter style={dark} language={language} children={value} />
  }
}

export default ({content}) => {
  return (
    <ReactMarkdown        
      className='markdown-body'
      plugins={[gfm]} 
      renderers={renderers} 
      children={content} 
    />
  )
}