import React from 'react';
import loadable from '@loadable/component';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

export default () => {
  const match = useRouteMatch();
  console.log(match)
  return (
    <Switch>
      <Route 
        path={`${match.path}/:id`}
        component={loadable(() =>
          import(/* WebpackChunkName: "home" */ './show')
        )}
      />
      <Route path={match.path}>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}