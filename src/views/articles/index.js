import React from 'react';
import loadable from '@loadable/component';
import { Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

import AuthRoute from '@/components/AuthRoute';
import Edit from './edit';


export default () => {
  const match = useRouteMatch();
  console.log(match)
  return (
    <Switch>
      <AuthRoute 
        path={`${match.path}/new`}
      >
        <Edit></Edit>
      </AuthRoute>
      <AuthRoute 
        path={`${match.path}/:id/edit`}
      >
        <Edit></Edit>
      </AuthRoute>
      <Route 
        path={`${match.path}/:id`}
        component={loadable(() =>
          import(/* WebpackChunkName: "article" */ './show')
        )}
      />
      <Route path={match.path}>
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}