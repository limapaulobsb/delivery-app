const md5 = require('md5');

const { User } = require('../../database/models');
const { createToken } = require('../utils');

const verify = {
  credentials: async (email, password) => {
    const hash = md5(password);
    const user = await User.findOne({
      where: { email, password: hash },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('Wrong credentials');
    }
    return user;
  },

  userDoesNotExist: async (email) => {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
    if (user) {
      throw new Error('E-mail already used');
    }
  },

  userExists: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};

const changeRole = async (id, role) => {
  await verify.userExists(id);
  return User.update({ role }, { where: { id } });
};

const create = async (payload) => {
  const { name, email, password } = payload;
  await verify.userDoesNotExist(email);
  const hash = md5(password);
  return User.create({ name, email, password: hash });
};

const destroy = async (id) => {
  await verify.userExists(id);
  return User.destroy({ where: { id } });
};

const findAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const findUser = async (id) => verify.userExists(id);

const login = async (email, password) => {
  const user = await verify.credentials(email, password);
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = createToken(payload);
  return { ...payload, token };
};

const update = async (id, payload) => {
  const { name, email, password } = payload;
  const user = await verify.userExists(id);
  if (email !== user.email) {
    await verify.userDoesNotExist(email);
  }
  const hash = md5(password);
  return User.update({ name, email, password: hash }, { where: { id } });
};

module.exports = {
  changeRole,
  create,
  destroy,
  findAll,
  findUser,
  login,
  update,
};
