import React, { useState } from 'react';

const authContent = React.createContext(null);

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);

  const auth = {
    user,
    login(user, cb){
      setUser(user);
      cb && cb()
    },
    logout(){
      setUser(null);
    }
  }
  return <authContent.Provider value={auth}>{children}</authContent.Provider>
}

export const useAuth = () => {
  const auth = React.useContext(authContent)
  if(!auth){
    throw new Error('useAuth must be used within a AuthProvider.')
  }
  return auth;
}