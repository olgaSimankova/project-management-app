import { App } from 'App/App';
import { BASENAME } from 'constants/constants';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename={BASENAME}>
    <App />
  </BrowserRouter>
);
