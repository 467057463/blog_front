
import { useLocalStore } from 'mobx-react';
import React from 'react';
import articles from './ArticlesStore'

const store = {
  articles
}

const storeContext = React.createContext(null);

export const StoreProvider = ({children}) => {
  // const store = useLocalStore(articles);
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if(!store){
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store;
}
