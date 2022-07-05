import axios from 'axios';

async function createUser({ body }) {
  try {
    const result = await axios.post('/users', body);
    return result;
  } catch (error) {
    return error.response;
  }
}

async function findSellers() {
  try {
    const result = await axios.get('/sellers');
    return result;
  } catch (error) {
    return error.response;
  }
}

async function findSellerProducts({ id }) {
  try {
    const result = await axios.get(`/sellers/${id}/products`);
    return result;
  } catch (error) {
    return error.response;
  }
}

async function login({ body }) {
  try {
    const result = await axios.post('/users/login', body);
    return result;
  } catch (error) {
    return error.response;
  }
}

export { createUser, findSellers, findSellerProducts, login };
