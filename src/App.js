import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import loadable from '@loadable/component';
import Header from '@/views/layout/Header';
import { useStore } from '@/hook/useStore';

import { Layout } from 'antd';
import '@/styles/app.scss';

const {  Footer, Sider, Content } = Layout;

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
      <Layout>
        <Header/>
        <Content style={{paddingTop: '50px'}}>
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
        </Content>
        <Footer style={{textAlign: 'center'}}>m2-个人博客</Footer> 
      </Layout>           
    </Layout>
  );
}

export default hot(App);