import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

export default () => {
  const { pathname } = useLocation();
  if(pathname === '/articles'){
    return <Redirect to="/" />
  }
  return (
    <Switch>
      <Route 
        path=":id"
        exact
        component={loadable(() =>
          import(/* WebpackChunkName: "home" */ './show')
        )}
      />
    </Switch>
  )
}