import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { LINKS } from 'constants/constants';
import { Boards } from 'Pages/Boards';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

export const App = () => (
  <>
    <CssBaseline>
      <Header />
      <Routes>
        <Route path={LINKS.welcome} element={<Welcome />} />
        <Route path={LINKS.error} element={<Error />} />
        <Route path={LINKS.search} element={<Search />} />
        <Route path={LINKS.boards} element={<Boards />} />
      </Routes>
      <Footer />
    </CssBaseline>
  </>
);
console.log(2);
