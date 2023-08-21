import React, { Suspense } from 'react';
import LanguageBar from './layout/LanguageBar';
import MenuBar from './layout/MenuBar';
import Footer from './layout/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Generic from './pages/Generic';
import Deposit from './pages/Deposit';
import { SignInCallback, AuthRoute } from './user/Auth';
import { UserSettings, UserSubmissions } from './user/User';
import NotificationList from './features/notification/Notification';
import type { Page } from './types/Pages';
import Skeleton from '@mui/material/Skeleton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AuthProvider } from 'react-oidc-context';
import { useFetchUserProfileQuery } from './user/authApi';

// Load theme
const theme = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/theme`).default;

// Load pages
const pages: Page[] = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/pages`).default;
const formSections = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/form`).default;

const authProvider = {
  authority: process.env.REACT_APP_OIDC_AUTHORITY as string,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID as string,
  scope: process.env.REACT_APP_OIDC_SCOPE as string || 'openid profile',
  redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URI as string,
  loadUserInfo: true,
};

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <AuthProvider {...authProvider}>
          <CssBaseline />
          <BrowserRouter>
            <Suspense fallback={<Skeleton width={200} height={30} />}>
              <LanguageBar />
            </Suspense>
            <MenuBar pages={pages} />
            <Routes>
              <Route path="signin-callback" element={<SignInCallback />} />
              <Route path="user-settings" element={<AuthRoute><UserSettings /></AuthRoute>} />
              <Route path="user-submissions" element={<AuthRoute><UserSubmissions /></AuthRoute>} />
              {pages.map( (page, i) => {
                return (
                  <Route 
                    key={page.id} 
                    path={page.slug} 
                    element={
                      page.template === 'deposit' ? 
                      <AuthRoute><Deposit form={formSections} /></AuthRoute> : 
                      <Generic page={page} />
                    } 
                  />
                )
              }
              )}
            </Routes>
          </BrowserRouter>
          <Footer />
          <NotificationList />
        </AuthProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
