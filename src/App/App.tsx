import React from 'react';
import { LINKS } from 'constants/constants';
import { Main } from 'Pages/Main';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Authentication from '../Pages/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import Board from '../features/Board/Board';
import { init } from './app.config';
import { themeLight } from 'theme/themeLight';
import { themeDark } from 'theme/themeDark';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { useUserSystemTheme } from 'hooks/useUserSystemTheme';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/ErrorFallback/ErrorFallback';

export const App = () => {
  const userTheme = useUserSystemTheme();
  init(userTheme);
  const { theme } = useCustomTheme();

  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => console.log('123')}
        // resetKeys={[]}
      >
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
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
};
