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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Generic from './pages/Generic';
import Deposit from './pages/Deposit';
import NotificationList from './features/notification/Notification';
import type { Page, ComponentTypes } from './types/Pages';
import { useTranslation } from 'react-i18next';

// Load pages
const pages: Page[] = require(`./config/${process.env.REACT_APP_CONFIG_FOLDER}/pages`).default;

const components: ComponentTypes = {
  generic: Generic,
  deposit: Deposit,
}

const App = () => {
  const { i18n } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LanguageBar />
        <MenuBar pages={pages} />
        <Routes>
          {pages.map( (page, i) => {
            const Comp = components[page.template];
            return (
              <Route 
                key={page.id} 
                path={`/:lang?/${page.slug[i18n.language] || page.slug}`} 
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
  )
}

export default App;
