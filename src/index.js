import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from '@/App';
import { StoreProvider } from '@/hook/useStore';
import { AuthProvider } from '@/hook/useAuth';

ReactDOM.render(
  <AuthProvider>
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </AuthProvider>,
  document.getElementById('root')
);


