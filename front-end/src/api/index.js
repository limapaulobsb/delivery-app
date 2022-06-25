import axios from 'axios';

async function createUser({ body }) {
  try {
    const result = await axios.post('/users', body);
    return result;
  } catch (error) {
    return error.response;
  }
}

async function findSellers({ token }) {
  try {
    const result = await axios.get('/sellers', { headers: { token } });
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

export { createUser, findSellers, login };
