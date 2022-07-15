import React, { useContext, useEffect } from 'react';

import { SaleContext } from '../context';
import { Header, SaleCard } from '../components';

function Orders() {
  const { getUserSales, sales } = useContext(SaleContext);

  useEffect(() => {
    getUserSales();
  }, [getUserSales]);

  // Render functions
  const renderCards = () => {
    return sales.map((sale) => <SaleCard key={sale.id} sale={sale} />);
  };

  // Main render
  return (
    <main>
      <Header />
      <h2>Meus Pedidos</h2>
      <ul className='grid-list'>{renderCards()}</ul>
    </main>
  );
}

export default Orders;
