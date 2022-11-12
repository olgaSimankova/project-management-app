import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BASENAME } from './constants/constants';
import { App } from './App/App';
import { Provider } from 'react-redux';
import { store } from './App/state/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={BASENAME}>
      <App />
    </BrowserRouter>
  </Provider>
);
