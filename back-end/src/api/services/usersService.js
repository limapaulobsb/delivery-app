const { Op } = require('sequelize');
const md5 = require('md5');

const { User } = require('../../database/models');
const { createToken } = require('../utils');

const genericFind = async (options) => {
  return User.findOne({
    where: { [Op.or]: options },
    attributes: { exclude: ['password'] },
  });
};

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

  fields: (fields) => {
    const { email, password, name, role } = fields;
    if ('email' in fields && !(email && /\S+@\S+\.\S+/.test(email))) {
      throw new Error('Invalid email');
    }
    if ('password' in fields && !(password && password.length >= 6)) {
      throw new Error('Invalid password');
    }
    if ('name' in fields && !(name && name.length >= 6)) {
      throw new Error('Invalid name');
    }
    if ('role' in fields && !['customer', 'seller', 'admin'].includes(role)) {
      throw new Error('Invalid role');
    }
  },

  userDoesNotExist: async (options) => {
    const user = await genericFind(options);
    if (user) {
      throw new Error('User already exists');
    }
  },

  userExists: async (options) => {
    const user = await genericFind(options);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};

const changeRole = async (id, role) => {
  verify.fields({ role });
  await verify.userExists([{ id }]);
  await User.update({ role }, { where: { id } });
  return true;
};

const create = async (payload) => {
  const { email, password, name } = payload;
  verify.fields({ email, password, name });
  await verify.userDoesNotExist([{ name }, { email }]);
  const hash = md5(password);
  return User.create({ email, password: hash, name });
};

const destroy = async (id) => {
  await verify.userExists([{ id }]);
  return User.destroy({ where: { id } });
};

const findAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const findUser = async (options) => verify.userExists(options);

const login = async (email, password) => {
  const { id, name, role } = await verify.credentials(email, password);
  const payload = { id, email, name, role };
  const token = createToken(payload);
  return { ...payload, token };
};

const update = async (id, payload) => {
  const { email, password, name } = payload;
  verify.fields({ email, password, name });
  await verify.userExists([{ id }]);
  const hash = md5(password);
  return User.update({ email, password: hash, name }, { where: { id } });
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
