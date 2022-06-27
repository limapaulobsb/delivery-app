const { Seller, User } = require('../../database/models');
const { errorMessages, settings } = require('../utils');

const lang = settings.language;

// Database validations
const verify = {
  async sellerDoesNotExist(name) {
    const seller = await Seller.findOne({ where: { name } });
    if (seller) {
      throw new Error(errorMessages.NAME_USED[lang]);
    }
  },

  async sellerExists(id) {
    const seller = await Seller.findByPk(id);
    if (!seller) {
      throw new Error(errorMessages.SELLER_NOT_FOUND[lang]);
    }
    return seller;
  },

  async userRole(userId) {
    const user = await User.findByPk(userId);
    if (user?.role !== 'seller') {
      throw new Error(errorMessages.INVALID_USER[lang]);
    }
    return user;
  },
};

const changeUser = async (id, userId) => {
  await verify.sellerExists(id);
  await verify.userRole(userId);
  return Seller.update({ userId }, { where: { id } });
};

const create = async (payload) => {
  const { userId, name, category, imageUrl } = payload;
  await verify.sellerDoesNotExist(name);
  await verify.userRole(userId);
  return Seller.create({ userId, name, category, imageUrl });
};

const destroy = async (id) => {
  await verify.sellerExists(id);
  return Seller.destroy({ where: { id } });
};

const findAll = async () => Seller.findAll();

const findSeller = async (id) => verify.sellerExists(id);

const findSellerProducts = async (id) => {
  const seller = await verify.sellerExists(id);
  return seller.getProducts();
};

const update = async (id, payload) => {
  const { name, category, imageUrl } = payload;
  const seller = await verify.sellerExists(id);
  if (name !== seller.name) {
    await verify.sellerDoesNotExist(name);
  }
  return Seller.update({ name, category, imageUrl }, { where: { id } });
};

module.exports = {
  changeUser,
  create,
  destroy,
  findAll,
  findSeller,
  findSellerProducts,
  update,
};
