import React, { useContext } from 'react';

import { SellerContext } from '../context';
import { Header, SellerCard } from '../components';

function Sellers() {
  const { sellers } = useContext(SellerContext);

  // Render functions
  const renderCards = () => {
    return sellers.map((seller) => <SellerCard key={seller.id} seller={seller} />);
  };

  // Main render
  return (
    <main>
      <Header />
      <ul>{renderCards()}</ul>
    </main>
  );
}

export default Sellers;
