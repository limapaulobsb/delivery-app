import React, { useContext } from 'react';

import { MainContext, ProductContext } from '../context';
import { Header, InputGroup, SaleDetails } from '../components';

function Checkout() {
  const { isLoading } = useContext(MainContext);
  const { cart } = useContext(ProductContext);

  const sales = cart.reduce((acc, curr) => {
    if (!acc[curr.product.sellerId]) {
      acc[curr.product.sellerId] = { products: [], totalPrice: 0 };
    }
    acc[curr.product.sellerId].products.push(curr);
    acc[curr.product.sellerId].totalPrice += curr.product.price * curr.quantity;
    return acc;
  }, {});

  const sellerIds = Object.keys(sales);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const renderSales = () => {
    return sellerIds.map((sellerId) => (
      <SaleDetails key={sellerId} sellerId={Number(sellerId)} sale={sales[sellerId]} />
    ));
  };

  return (
    <main>
      <Header />
      <h2>Checkout</h2>
      {renderSales()}
      <section>
        <form onSubmit={handleSubmit}>
          <InputGroup>Endereço de entrega:</InputGroup>
          <button type='submit' className='gradient' disabled>
            {isLoading ? <div className='loader' /> : 'Finalizar pedido'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Checkout;
