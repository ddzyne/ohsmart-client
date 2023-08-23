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
import { AuthProvider } from 'react-oidc-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Box from '@mui/material/Box';

// Load theme
import theme from './config/ohsmart/theme';
import pages from './config/ohsmart/pages';
import formSections from './config/ohsmart/form';

const authProvider = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY as string,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID as string,
  scope: import.meta.env.VITE_OIDC_SCOPE as string || 'openid profile',
  redirect_uri: `${window.location.origin}/signin-callback`,
  loadUserInfo: true,
};

const formProps = {
  form: formSections,
  targetRepo: 'demo.ssh.datastations.nl',
  dataverseApiKeyIdentifier: 'dataverse_api_key', // key to use from Keycloak user object
  submitKey: import.meta.env.VITE_PACKAGING_KEY, // maybe not use .env file anymore?
  targetAuth: 'API_KEY',
  targetKey: import.meta.env.VITE_TARGET_KEY, // todo.. dataverse api key, get this from auth using dataverseApiKeyIdentifier, so not needed here anymore
  skipValidation: true,
  geonamesApiKey: 'dans_deposit_webapp',
  // Todo: also pass along the user profile
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider {...authProvider}>
        <CssBaseline />
        <BrowserRouter>
          <LanguageBar />
          <MenuBar pages={pages} />
          <Suspense fallback={<Box sx={{display: 'flex', justifyContent: 'center'}}><Skeleton height={600} width={900} /></Box>}>
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
          </Suspense>
        </BrowserRouter>
        <Footer />
        <NotificationList />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
