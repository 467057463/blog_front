import React, { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from '@/App';
import Store from '@/store';

export const StoreContext = createContext()

ReactDOM.render(
  <StoreContext.Provider value={new Store('test todo')}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById('root')
);


