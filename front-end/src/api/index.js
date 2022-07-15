import axios from 'axios';

async function genericRequest(axiosFn, ...params) {
  try {
    const result = await axiosFn(...params);
    return result;
  } catch (error) {
    return error.response;
  }
}

const api = {
  async changePassword({ body, id, token }) {
    return genericRequest(axios.patch, `/users/${id}/password`, body, {
      headers: { token },
    });
  },

  async changeRole({ body, id, token }) {
    return genericRequest(axios.patch, `/users/${id}/role`, body, {
      headers: { token },
    });
  },

  async createUser({ body }) {
    return genericRequest(axios.post, '/users', body);
  },

  async deleteUser({ id, token }) {
    return genericRequest(axios.delete, `/users/${id}`, { headers: { token } });
  },

  async findSellers() {
    return genericRequest(axios.get, '/sellers');
  },

  async findSellerProducts({ id }) {
    return genericRequest(axios.get, `/sellers/${id}/products`);
  },

  async findUserSales({ id, token }) {
    return genericRequest(axios.get, `/users/${id}/sales`, { headers: { token } });
  },

  async login({ body }) {
    return genericRequest(axios.post, '/users/login', body);
  },

  async updateUser({ body, id, token }) {
    return genericRequest(axios.put, `/users/${id}`, body, {
      headers: { token },
    });
  },
};

export default api;
