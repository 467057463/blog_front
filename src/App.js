import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import loadable from '@loadable/component';
import Header from '@/views/layout/Header';
import { useStore } from '@/hook/useStore';

import { Layout } from 'antd';
import '@/styles/app.scss';


function App() {
  function AppStart(){
    auth.getCurrentUser();
  }
  const { auth } = useStore();

  useEffect(()=> {
    AppStart();
  }, [])
  return (
    <Layout className="app">
      <Header/>
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
    </Layout>
  );
}

export default hot(App);