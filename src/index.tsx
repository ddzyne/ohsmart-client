import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import i18n from './app/i18n';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from 'react-oidc-context';

const container = document.getElementById('root')!;
const root = createRoot(container);

const oidcConfig = {
  authority: process.env.REACT_APP_AUTHORITY as string,
  client_id: process.env.REACT_APP_CLIENT_ID as string,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI as string,
  scope: 'openid profile email aarc',
  loadUserInfo: true,
};

root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <ReduxProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
