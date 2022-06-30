import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductContext } from '../context';
import { Header, ProductCard } from '../components';

function Products() {
  const { products, getProducts } = useContext(ProductContext);
  const { id } = useParams();

  useEffect(() => {
    getProducts(id);
  }, [getProducts, id]);

  const renderCards = () => {
    return products.map((product) => <ProductCard key={product.id} product={product} />);
  };

  return (
    <main className='products-page'>
      <Header />
      <ul>{renderCards()}</ul>
    </main>
  );
}

export default Products;
