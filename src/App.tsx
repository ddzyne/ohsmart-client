import React, { Suspense } from 'react';
import LanguageBar from './layout/LanguageBar';
import MenuBar from './layout/MenuBar';
import Footer from './layout/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/global/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Generic from './pages/Generic';
import Deposit from './pages/Deposit';
import { SignInCallback, AuthRoute } from './auth/Auth';
import { UserSettings, UserSubmissions } from './pages/User';
import NotificationList from './features/notification/Notification';
import type { Page } from './types/Pages';
import Skeleton from '@mui/material/Skeleton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AuthProvider } from 'react-oidc-context';
import { getAuthProvider } from './auth/authSlice';
import { useAppSelector } from './app/hooks';

// Load pages
const pages: Page[] = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/pages`).default;
const formSections = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/form`).default;

const App = () => {
  // we set the key of AuthProvider too, to make sure it actually updates when it changes
  const authProvider = useAppSelector(getAuthProvider);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <AuthProvider key={authProvider.authority} {...authProvider}>
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
