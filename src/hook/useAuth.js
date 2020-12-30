import React, { useState } from 'react';
import { store } from '@/store';

const authContent = React.createContext(null);

export const AuthProvider = ({children}) =>{
  const { auth } = store;
  return <authContent.Provider value={auth}>{children}</authContent.Provider>
}

export const useAuth = () => {
  const auth = React.useContext(authContent)
  if(!auth){
    throw new Error('useAuth must be used within a AuthProvider.')
  }
  return auth;
}