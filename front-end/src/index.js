import React from 'react';
import ReactDOM from 'react-dom/client';

import { MainProvider, ProductProvider, SaleProvider, SellerProvider } from './context';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MainProvider>
      <ProductProvider>
        <SaleProvider>
          <SellerProvider>
            <App />
          </SellerProvider>
        </SaleProvider>
      </ProductProvider>
    </MainProvider>
  </React.StrictMode>
);
