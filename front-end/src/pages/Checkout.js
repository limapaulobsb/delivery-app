import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext, ProductContext, SaleContext } from '../context';
import { useValidation } from '../hooks';
import { Header, InputGroup, SaleProductList } from '../components';

function Checkout() {
  const { isLoading, user } = useContext(MainContext);
  const { cart, setCart } = useContext(ProductContext);
  const { createSale, saleTotal } = useContext(SaleContext);
  const [inputs, setInputs] = useState({ address: '' });
  const navigate = useNavigate();
  const [validation] = useValidation([inputs]);

  // Create an object with the products separated by seller id
  const productsObj = cart.reduce((acc, curr) => {
    if (!acc[curr.product.sellerId]) {
      acc[curr.product.sellerId] = [];
    }
    acc[curr.product.sellerId].push(curr);
    return acc;
  }, {});

  const sellerIds = Object.keys(productsObj);

  // Input handler
  const handleChange = ({ target: { name, value } }) => {
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  // Execute the checkout and if successful redirect to the appropriate page
  const handleSubmit = async (event) => {
    event.preventDefault();

    const promises = sellerIds.map((sellerId) => {
      return createSale({
        sellerId,
        userId: user.id,
        totalPrice: saleTotal(productsObj[sellerId]),
        deliveryAddress: inputs.address,
        products: productsObj[sellerId],
      });
    });

    const results = await Promise.all(promises);

    if (results.every((result) => result)) {
      setCart([]);
      navigate('/orders');
    }
  };

  // Render functions
  const renderSales = () => {
    return sellerIds.map((sellerId) => (
      <SaleProductList key={sellerId} products={productsObj[sellerId]} />
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
          <InputGroup
            label='Endereço de entrega:'
            name='address'
            onChange={handleChange}
          />
          <button type='submit' className='gradient' disabled={!validation}>
            {isLoading ? <div className='loader' /> : 'Finalizar pedido'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Checkout;
