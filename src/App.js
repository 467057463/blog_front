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

  const [ collapsed, setCollapsed ] = useState(false)

  useEffect(()=> {
    AppStart();
  }, [])

  function onCollapse(collapsed){
    setCollapsed(collapsed)
  }
  return (
    <Layout className="app">
      <Sider 
        theme="light"
        collapsedWidth="0" 
        breakpoint="lg" 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        onCollapse={onCollapse}
      >silder</Sider>
      <Layout>
        <Header setCollapsed={setCollapsed} collapsed={collapsed}/>
        <Content>
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
        <Footer>sss</Footer> 
      </Layout>           
    </Layout>
  );
}

export default hot(App);