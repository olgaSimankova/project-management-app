import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App/App';
import { Provider } from 'react-redux';
import { store } from './App/state/store';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  </I18nextProvider>
);
