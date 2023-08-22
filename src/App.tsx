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
import Skeleton from '@mui/material/Skeleton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AuthProvider } from 'react-oidc-context';
import { useFetchUserProfileQuery } from './user/authApi';
import type { Language } from './types/Language';
import { useTranslation } from 'react-i18next';

// Load theme
import theme from './config/ohsmart/theme';
import pages from './config/ohsmart/pages';
import formSections from './config/ohsmart/form';

const authProvider = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY as string,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID as string,
  scope: import.meta.env.VITE_OIDC_SCOPE as string || 'openid profile',
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI as string,
  loadUserInfo: true,
};

const formProps = {
  form: formSections,
  targetRepo: 'demo.ssh.datastations.nl',
  dataverseApiKeyIdentifier: 'dataverseApiKey',
  skipValidation: true,
}

const App = () => {
  const { i18n } = useTranslation();
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
                      <AuthRoute>
                        <Deposit {...formProps} />
                      </AuthRoute> : 
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
