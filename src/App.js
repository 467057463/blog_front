import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import loadable from '@loadable/component';

import '@/styles/app.scss';
import background from '@/images/2020.jpg';


function App() {
  return (
    <div className="app">
      <Switch>
        <Route
          path="/"
          exact
          component={loadable(() =>
            import(/* WebpackChunkName: "home" */ './views/Home')
          )}
        />  
        <Route
          path="/login"
          exact
          component={loadable(() =>
            import(/* WebpackChunkName: "home" */ './views/Login')
          )}
        />      
      </Switch>
    </div>
  );
}

export default hot(App);