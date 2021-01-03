import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/markdown/markdown'


export default ({content, setContent}) => {
  return(
    <CodeMirror
      value={content}
      options={{
        mode: 'markdown',
        theme: 'mdn-like',
        lineNumbers: true
      }}
      onBeforeChange={(editor, data, value) => {
        setContent(value);
      }}
      onChange={(editor, data, value) => {
      }}
    />
  )
}