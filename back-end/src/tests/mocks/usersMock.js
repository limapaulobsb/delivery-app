const users = [
  {
    id: 1,
    email: 'customer@deliveryapp.com',
    password: '4297f44b13955235245b2497399d7a93',
    name: 'App Customer',
    role: 'customer',
  },
  {
    id: 2,
    email: 'seller@deliveryapp.com',
    password: '4297f44b13955235245b2497399d7a93',
    name: 'App Seller',
    role: 'seller',
  },
  {
    id: 3,
    email: 'admin@deliveryapp.com',
    password: '4297f44b13955235245b2497399d7a93',
    name: 'App Admin',
    role: 'admin',
  },
];

const customer = {
  id: 1,
  email: 'customer@deliveryapp.com',
  name: 'App Customer',
  role: 'customer',
};

const seller = {
  id: 2,
  email: 'seller@deliveryapp.com',
  name: 'App Seller',
  role: 'seller',
};

const admin = {
  id: 3,
  email: 'admin@deliveryapp.com',
  name: 'App Admin',
  role: 'admin',
};

module.exports = {
  admin,
  customer,
  seller,
  users,
};
