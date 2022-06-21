const { Seller, User } = require('../../database/models');

const verify = {
  fields: (fields) => {
    const { name, category, imageUrl } = fields;
    if ('name' in fields && !(name && name.length >= 6)) {
      throw new Error('Invalid name');
    }
    if ('category' in fields && !(category && category.length >= 6)) {
      throw new Error('Invalid category');
    }
    if ('imageUrl' in fields && imageUrl && !(imageUrl.length >= 20)) {
      throw new Error('Invalid image URL');
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

  userExists: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
};

const create = async (payload) => {
  const { userId, name, category, imageUrl } = payload;
  verify.fields(payload);
  await verify.userExists(userId);
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
  verify.fields(payload);
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
