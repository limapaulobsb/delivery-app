import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MainContext, ProductContext } from '../context';
import { Header, ProductCard } from '../components';

function Products() {
  const { isLoading } = useContext(MainContext);
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
      {isLoading || <ul>{renderCards()}</ul>}
    </main>
  );
}

export default Products;
