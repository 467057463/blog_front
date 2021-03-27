import React from 'react';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
// import * as slug from 'remark-slug';
import HeadingRenderer from '@/components/HeadingRenderer';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ADDED = [1, 2];
const REMOVED = [6];

function scopeNumber(start, end){
  let res = []
  for(let i = start; i <= end; i++){
    res.push(i)
  }
  return res;
}

const renderers = {
  tableRender(props){
    return (
      <div className="table-responsive">
        <table>{props.children}</table>
      </div>
    )
  },
  code: ({language, value}) => {
    const reg = /{(.+)}$/;
    const scopeReg = /^(\d+)-(\d+)$/;
    const line = language.match(reg);
    let lines = []
    if(line){
      line[1].split(",").forEach(item =>{
        const match = item.match(scopeReg);
        if(match){
          lines = lines.concat(scopeNumber(+match[1], +match[2]))
        }else{
          lines.push(+item)
        }
      })
    }
    return (
      <SyntaxHighlighter 
        showLineNumbers 
        showInlineLineNumbers 
        style={a11yDark} 
        language={language.replace(reg, '')}
        wrapLines
        lineProps={lineNumber => {
          let style = { display: 'block' };
          if (lines.includes(lineNumber)) {
            style.backgroundColor = '#404040';
          }
          return { style };
        }} 
      >
        {value}
      </SyntaxHighlighter>
    )
  },
  heading: HeadingRenderer
}

export default ({content}) => {
  return (
    <ReactMarkdown        
      className='markdown-body'
      plugins={[gfm]} 
      renderers={renderers}
      children={content}
      allowDangerousHtml
    />
  )
}