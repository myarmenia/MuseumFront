import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
          <GoogleOAuthProvider clientId="1690223887-9gsqs2ia6ua71c2fkup3vvp3l267clgh.apps.googleusercontent.com">
              <App />
          </GoogleOAuthProvider>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
)

