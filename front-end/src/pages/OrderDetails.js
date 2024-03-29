import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SaleContext } from '../context';
import { Header, SaleProductList } from '../components';
import '../styles/OrderDetails.css';

function OrderDetails() {
  const { getSale, sale } = useContext(SaleContext);
  const { id } = useParams();

  let bgColor = 'bg-blue';

  if (sale.status === 'Pendente') {
    bgColor = 'bg-yellow';
  } else if (sale.status === 'Entregue') {
    bgColor = 'bg-green';
  }

  useEffect(() => {
    if (Number(id) !== sale.id) {
      getSale(id);
    }
  }, [getSale, id, sale.id]);

  return (
    <main className='order-details'>
      <Header />
      <h2>
        <span>{`Pedido #${sale.id?.toString().padStart(4, '0')}`}</span>
        <div className={`order-details__status ${bgColor}`}>{sale.status}</div>
      </h2>
      <SaleProductList products={sale.products ?? []} />
      <section>
        <span>Data:</span>
        <span>{new Date(sale.date).toLocaleString('pt-BR')}</span>
        <br />
        <span>Endereço de entrega:</span>
        <span>{sale.deliveryAddress}</span>
      </section>
    </main>
  );
}

export default OrderDetails;
