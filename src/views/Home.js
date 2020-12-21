import React, { useContext } from 'react';
import { StoreContext } from '@/index';
import { observer } from 'mobx-react';


export default observer(()=>{
  const store = useContext(StoreContext);
  // console.log(store)
  return(
    <div className='home' onClick={() => store.toggle()}>
      {store.title}
      {store.finished.toString()}
    </div>
  )
})

