import React from 'react';
import { LINKS } from 'constants/constants';
import { Main } from 'Pages/Main';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import Authentication from '../Pages/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import Board from '../features/Board/Board';
import { init } from './app.config';
import { themeLight } from 'theme/themeLight';
import { themeDark } from 'theme/themeDark';
import { useCustomTheme } from 'hooks/useCustomTheme';

export const App = () => {
  init();
  let { theme } = useCustomTheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const userTheme = prefersDarkMode ? 'dark' : 'light';
  if (!theme) theme = userTheme;

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
        <CssBaseline>
          <ToastContainer autoClose={2000} />
          <Routes>
            <Route path={LINKS.welcome} element={<Layout />}>
              <Route index path={LINKS.welcome} element={<Welcome />} />
              <Route path={LINKS.search} element={<Search />} />
              <Route path={LINKS.main} element={<Main />} />
              <Route path={`${LINKS.main}/:boardId`} element={<Board />} />
            </Route>
            <Route path={LINKS.signIn} element={<Authentication />} />
            <Route path={LINKS.signUp} element={<Authentication />} />
            <Route path={LINKS.error} element={<Error />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};
