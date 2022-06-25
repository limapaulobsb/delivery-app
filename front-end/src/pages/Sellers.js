import React, { useContext, useEffect } from 'react';

import { SellerContext } from '../context';
import { Header, SellerCard } from '../components';
import '../styles/Sellers.css';

function Sellers() {
  const { sellers, getSellers } = useContext(SellerContext);

  useEffect(() => {
    if (sellers.length === 0) getSellers();
  }, [sellers.length, getSellers]);

  const renderCards = () => {
    return sellers.map(({ id, name, category, imageUrl }) => (
      <SellerCard key={id} id={id} name={name} category={category} imageUrl={imageUrl} />
    ));
  };

  return (
    <main className='sellers-page'>
      <Header />
      <ul>{renderCards()}</ul>
    </main>
  );
}

export default Sellers;
