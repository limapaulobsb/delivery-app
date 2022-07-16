import React, { useContext } from 'react';

import { MainContext, ProductContext } from '../context';
import { Header, InputGroup, SaleProductList } from '../components';

function Checkout() {
  const { isLoading } = useContext(MainContext);
  const { cart } = useContext(ProductContext);

  // Create a sales object from the cart
  const sales = cart.reduce((acc, curr) => {
    if (!acc[curr.product.sellerId]) {
      acc[curr.product.sellerId] = [];
    }
    acc[curr.product.sellerId].push(curr);
    return acc;
  }, {});

  const sellerIds = Object.keys(sales);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Render functions
  const renderSales = () => {
    return sellerIds.map((sellerId) => (
      <SaleProductList key={sellerId} products={sales[sellerId]} />
    ));
  };

  // Main render
  return (
    <main>
      <Header />
      <h2>Checkout</h2>
      {renderSales()}
      <section>
        <form onSubmit={handleSubmit}>
          <InputGroup label='Endereço de entrega:' name='address' />
          <button type='submit' className='gradient' disabled>
            {isLoading ? <div className='loader' /> : 'Finalizar pedido'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Checkout;
