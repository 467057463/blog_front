import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from '@/hook/history';
import App from '@/App';
import { StoreProvider } from '@/hook/useStore';
import { AuthProvider } from '@/hook/useAuth';

ReactDOM.render(
  <AuthProvider>
    <StoreProvider>
      <Router history={history}>
        <App />
      </Router>
    </StoreProvider>
  </AuthProvider>,
  document.getElementById('root')
);


