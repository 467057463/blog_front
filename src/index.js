import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from '@/App';
import store from '@/store';
import StoreContext from '@/hook/StoreContext'


ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);


