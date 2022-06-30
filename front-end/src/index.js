import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainProvider, ProductProvider, SellerProvider } from './context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MainProvider>
      <SellerProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </SellerProvider>
    </MainProvider>
  </React.StrictMode>
);
