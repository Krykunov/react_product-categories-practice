import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React from 'react';
import { App } from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/react_product-categories-practice/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
