import React, { Suspense } from 'react';
import './App.css';
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
import NotificationList from './features/notification/Notification';
import type { Page, ComponentTypes } from './types/Pages';
import Skeleton from '@mui/material/Skeleton';

// Load pages
const pages: Page[] = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/pages`).default;

const components: ComponentTypes = {
  generic: Generic,
  deposit: Deposit,
}

const App = () => 
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Suspense fallback={<Skeleton width={200} height={30} />}>
        <LanguageBar />
      </Suspense>
      <MenuBar pages={pages} />
      <Routes>
        {pages.map( (page, i) => {
          const Comp = components[page.template];
          return (
            <Route 
              key={page.id} 
              path={page.slug} 
              element={<Comp page={page} />} 
            />
          )
        }
        )}
      </Routes>
    </BrowserRouter>
    <Footer />
    <NotificationList />
  </ThemeProvider>

export default App;
