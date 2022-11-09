
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BASENAME } from './constants/constants';
import { App } from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename={BASENAME}>
    <App />
  </BrowserRouter>
);

