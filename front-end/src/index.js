import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainProvider, SellerProvider } from './context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MainProvider>
      <SellerProvider>
        <App />
      </SellerProvider>
    </MainProvider>
  </React.StrictMode>
);
