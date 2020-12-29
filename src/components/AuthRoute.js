import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '@/hook/useAuth';

export default ({children, ...res}) => {
  const auth = useAuth();
  return(
    <Route {...res}
      render={({ location }) => 
        auth.user ? (
          children
        ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: location }
          }}/>
        )
      }
    />
  )
}