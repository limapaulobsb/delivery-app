import React, { useContext } from 'react';

import { SellerContext } from '../context';
import { Header, SellerCard } from '../components';

function Sellers() {
  const { sellers } = useContext(SellerContext);

  const renderCards = () => {
    return sellers.map((seller) => <SellerCard key={seller.id} seller={seller} />);
  };

  return (
    <main>
      <Header />
      <ul>{renderCards()}</ul>
    </main>
  );
}

export default Sellers;
