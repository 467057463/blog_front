import React from 'react';
import { hot } from 'react-hot-loader/root';

import '@/styles/app.scss';
import background from '@/images/2020.jpg';


function App() {
  return (
    <div className="app">
    <h1 className="text">Hello a</h1>
    <i className="iconfont fi-start"></i>
    <img className="background" src={background} alt=""/>
  </div>
  );
}

export default hot(App);