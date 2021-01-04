import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/markdown/markdown'


export default ({content, setContent}) => {
  return(
    <div className='coder-editor'>
      <CodeMirror
        value={content}
        options={{
          mode: 'markdown',
          theme: 'material-palenight',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setContent(value);
        }}
        onChange={(editor, data, value) => {
        }}
      />
    </div>
  )
}
