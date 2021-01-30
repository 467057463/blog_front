import React from 'react';
import { Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/dart/dart'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/pug/pug'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/vue/vue'
// import 'codemirror/mode/gfm/gfm'


export default ({content, setContent}) => {
  return(
    <div className='coder-editor'>
      <CodeMirror
        value={content}
        options={{
          mode: 'markdown',
          theme: 'material-palenight',
          lineNumbers: true,
          lineWrapping: true,
          fencedCodeBlockHighlighting: true,
          highlightFormatting: true,
          fencedCodeBlockDefaultMode: 'javascript'
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
