import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { Layout } from 'antd';
import loadable from '@loadable/component';

import Header from '@/views/layout/Header';
import Loading from '@/components/Loading';

import { useStore } from '@/hook/useStore';
import '@/styles/app.scss';

const {  Footer, Sider, Content } = Layout;

const App = observer(() => {
  const [ state, setState ] = useState('pending')
  const { auth } = useStore();

  useEffect(()=> {
    AppStart();
  }, [])

  async function AppStart(){
    setState('pending')
    try{
      await auth.getCurrentUser();
      setState('success')
    }catch(error){
      setState('error')
    }
  }

  if(state === 'pending'){
    return <Loading/>
  }

  if(state === 'error'){
    return <div className='error'>error...</div>
  }

  return (
    <Layout className="app">
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
    </Layout>
  );
})

export default hot(App);