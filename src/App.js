import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import loadable from '@loadable/component';

import '@/styles/app.scss';


function App() {
  return (
    <div className="app">
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/articles/1">文章</Link></li>
      </ul>
      <Switch>
        <Route
          path="/"
          exact
          component={loadable(() =>
            import(/* WebpackChunkName: "home" */ './views/home')
          )}
        />  
        <Route
          path="/login"
          exact
          component={loadable(() =>
            import(/* WebpackChunkName: "Login" */ './views/Login')
          )}
        />  
        <Route 
          path="/articles"
          component={loadable(() =>
            import(/* WebpackChunkName: "article" */ './views/articles')
          )}
        />    
      </Switch>
    </div>
  );
}

export default hot(App);