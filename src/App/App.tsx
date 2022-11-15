import React, { useEffect } from 'react';

import { LINKS } from 'constants/constants';
import { Boards } from 'Pages/Boards';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Authentication from '../Pages/Authentication';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout/Layout';
import { setToken, setUser } from '../features/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import Board from '../features/Board/Board';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = JSON.parse(localStorage.getItem('token') || 'null');

    dispatch(setUser(user));
    dispatch(setToken(token));
  }, []);

  return (
    <>
      <CssBaseline>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path={LINKS.welcome} element={<Layout />}>
            <Route index element={<Board />} />
            <Route path={LINKS.search} element={<Search />} />
            <Route path={LINKS.boards} element={<Boards />} />
          </Route>
          <Route path={LINKS.signIn} element={<Authentication />} />
          <Route path={LINKS.signUp} element={<Authentication />} />
          <Route path={LINKS.error} element={<Error />} />
        </Routes>
      </CssBaseline>
    </>
  );
};
