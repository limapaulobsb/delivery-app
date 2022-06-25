import React from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../components';

function Products() {
  const { id } = useParams();

  return (
    <main>
      <Header />
      <h1>{id}</h1>
    </main>
  );
}

export default Products;
