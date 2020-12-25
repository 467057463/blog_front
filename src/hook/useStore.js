import React from 'react';
import { store } from '@/store';

const storeContext = React.createContext(null);

export const StoreProvider = ({children}) => {
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(storeContext)
  if(!store){
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store;
}

