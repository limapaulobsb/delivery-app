const { Seller, User } = require('../../database/models');

const verify = {
  fields: (...fields) => {
    for (const field of fields) {
      if (!field) {
        throw new Error('All fields must be filled');
      }
    }
  },

  userRole: async (id) => {
    const user = await User.findByPk(id);
    if (user?.role !== 'seller') {
      throw new Error('Invalid user');
    }
  },

  sellerDoesNotExist: async (name) => {
    const seller = await Seller.findOne({ where: { name } });
    if (seller) {
      throw new Error('Seller already exists');
    }
  },

  sellerExists: async (id) => {
    const seller = await Seller.findByPk(id);
    if (!seller) {
      throw new Error('Seller not found');
    }
    return seller;
  },
};

const create = async (payload) => {
  const { userId, name, category, imageUrl } = payload;
  verify.fields(userId, name, category);
  await verify.userRole(userId);
  await verify.sellerDoesNotExist(name);
  return Seller.create({ userId, name, category, imageUrl });
};

const destroy = async (id) => {
  await verify.sellerExists(id);
  return Seller.destroy({ where: { id } });
};

const findAll = async () => Seller.findAll();

const findSeller = async (id) => verify.sellerExists(id);

const update = async (id, payload) => {
  const { name, category, imageUrl } = payload;
  verify.fields(name, category);
  await verify.sellerExists(id);
  return Seller.update({ name, category, imageUrl }, { where: { id } });
};

module.exports = {
  create,
  destroy,
  findAll,
  findSeller,
  update,
};
