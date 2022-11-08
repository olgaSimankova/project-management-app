import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { PAGES } from 'constants/constants';
import { Boards } from 'Pages/Boards';
import { Error } from 'Pages/Error';
import { Search } from 'Pages/Search';
import { Welcome } from 'Pages/Welcome';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

export const App = () => (
  <>
    <Header />
    <Routes>
      <Route path={PAGES.welcome} element={<Welcome />} />
      <Route path={PAGES.error} element={<Error />} />
      <Route path={PAGES.search} element={<Search />} />
      <Route path={PAGES.boards} element={<Boards />} />
    </Routes>
    <Footer />
  </>
);
