import React from 'react';
import { LINKS } from 'constants/constants';
import { Main } from 'Pages/Main';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Authentication from '../Pages/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import { init } from './app.config';
import { store } from './state/store';
import { themeLight } from 'theme/themeLight';
import { themeDark } from 'theme/themeDark';
import { useMain } from 'hooks/useMain';

export const App = () => {
  init();
  const { theme } = useMain();
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? themeLight : themeDark}>
        <CssBaseline>
          <ToastContainer autoClose={2000} />
          <Routes>
            <Route path={LINKS.welcome} element={<Layout />}>
              <Route path={LINKS.welcome} element={<Welcome />} />
              <Route path={LINKS.search} element={<Search />} />
              <Route path={LINKS.main} element={<Main />} />
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
