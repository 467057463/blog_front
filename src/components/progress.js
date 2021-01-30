import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '@/hook/useStore';

export default observer(() => {
  const { app } = useStore();
  const { progress: {show, percent} } = app;
  return(
    <div className="progress">
      <div style={show ? {display: 'block'} : {display: 'none'}} className="bar">
        <div className="peg" style={{width: `${percent * 100}%`}}></div>
      </div>
    </div>
  )
})