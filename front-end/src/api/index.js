import axios from 'axios';

const createUser = async (name, email, password) => {
  try {
    const result = await axios.post('/users', {
      name,
      email,
      password,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

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


export { createUser, login };
