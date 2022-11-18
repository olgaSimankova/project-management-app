import React from 'react';
import { LINKS } from 'constants/constants';
import { Main } from 'Pages/Main';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Authentication from '../Pages/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import Board from '../features/Board/Board';
import { setUserInfo } from '../features/authSlice';
import { store } from './state/store';

export const App = () => {
  const token = JSON.parse(localStorage.getItem('token') || 'null');
  const login = JSON.parse(localStorage.getItem('login') || 'null');
  store.dispatch(setUserInfo({ token, login }));
  return (
    <>
      <CssBaseline>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path={LINKS.welcome} element={<Layout />}>
            <Route path={LINKS.welcome} element={<Welcome />} />
            <Route path={LINKS.search} element={<Search />} />
            <Route path={LINKS.main} element={<Main />} />
            <Route index element={<Board />} />
          </Route>
          <Route path={LINKS.signIn} element={<Authentication />} />
          <Route path={LINKS.signUp} element={<Authentication />} />
          <Route path={LINKS.error} element={<Error />} />
        </Routes>
      </CssBaseline>
    </>
  );
};
