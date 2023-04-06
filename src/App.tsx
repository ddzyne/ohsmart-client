import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import LanguageBar from './layout/LanguageBar';
import MenuBar from './layout/MenuBar';
import Footer from './layout/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Deposit from './pages/Deposit';

const App = () =>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <LanguageBar />
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="deposit" element={<Deposit />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </ThemeProvider>

export default App;
