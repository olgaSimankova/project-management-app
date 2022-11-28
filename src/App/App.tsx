import React from 'react';
import { LINKS } from 'constants/constants';
import { Main } from 'Pages/Main';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route, Navigate, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Authentication from '../Pages/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import Board from '../features/Board/Board';
import { init } from './app.config';
import { Settings } from 'Pages/Settings';
import { themeLight } from 'theme/themeLight';
import { themeDark } from 'theme/themeDark';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/ErrorFallback/ErrorFallback';
import { ErrorPage } from 'Pages/Error';

export const App = () => {
  const userTheme = useUserSystemTheme();
  init(userTheme);
  const { theme } = useCustomTheme();

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
              <Route path={LINKS.settings} element={<Settings />} />
              <Route path={`${LINKS.main}/:boardId`} element={<Board />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path={LINKS.signIn} element={<Authentication />} />
            <Route path={LINKS.signUp} element={<Authentication />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

// function RootBoundary() {
//   const error = useRouteError();

//   if (isRouteErrorResponse(error)) {
//     if (error.status === 404) {
//       return <div>This page doesn't exist!</div>;
//     }

//     if (error.status === 401) {
//       return <div>You aren't authorized to see this</div>;
//     }

//     if (error.status === 503) {
//       return <div>Looks like our API is down</div>;
//     }

//     if (error.status === 418) {
//       return <div>🫖</div>;
//     }
//   }

//   return <div>Something went wrong</div>;
// }
