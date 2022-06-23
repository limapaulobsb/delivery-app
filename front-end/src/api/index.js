import axios from 'axios';

const login = async (email, password) => {
  try {
    const result = await axios.post('/users/login', {
      email,
      password,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

export { login };
