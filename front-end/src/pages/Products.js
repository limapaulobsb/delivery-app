import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductContext } from '../context';
import { Header, ProductCard } from '../components';

function Products() {
  const { getProducts, products } = useContext(ProductContext);
  const { id } = useParams();

  useEffect(() => {
    getProducts(id);
  }, [getProducts, id]);

  const renderCards = () => {
    return products.map((product) => <ProductCard key={product.id} product={product} />);
  };

  return (
    <main>
      <Header />
      <ul>{renderCards()}</ul>
    </main>
  );
}

export default Products;
