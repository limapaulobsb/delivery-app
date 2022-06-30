import React, { useContext } from 'react';

import { ProductContext } from '../context';
import { Header } from '../components';

function Products() {
  const { cart } = useContext(ProductContext);
  console.log(cart);

  return (
    <main className='checkout-page'>
      <Header />
    </main>
  );
}

export default Products;
