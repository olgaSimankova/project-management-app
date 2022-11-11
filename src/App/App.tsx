import React from 'react';

import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { LINKS } from 'constants/constants';
import { Boards } from 'Pages/Boards';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => (
  <>
    <CssBaseline>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path={LINKS.welcome} element={<Welcome />} />
        <Route path={LINKS.signIn} element={<SignIn />} />
        <Route path={LINKS.signUp} element={<SignUp />} />
        <Route path={LINKS.error} element={<Error />} />
        <Route path={LINKS.search} element={<Search />} />
        <Route path={LINKS.boards} element={<Boards />} />
      </Routes>
      <Footer />
    </CssBaseline>
  </>
);
