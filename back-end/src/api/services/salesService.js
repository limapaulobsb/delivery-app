const { Product, Sale, SaleProduct, Seller, User } = require('../../database/models');
const { errorMessages, settings } = require('../utils');

const lang = settings.language;

// Database validations
const verify = {
  async saleExists(id) {
    const sale = await Sale.findByPk(id, {
      include: {
        model: SaleProduct,
        as: 'products',
        attributes: { exclude: ['productId', 'saleId'] },
        include: { model: Product, as: 'product' },
      },
    });
    if (!sale) {
      throw new Error(errorMessages.SALE_NOT_FOUND[lang]);
    }
    return sale;
  },

  async sellerExists(id) {
    const seller = await Seller.findByPk(id);
    if (!seller) {
      throw new Error(errorMessages.SELLER_NOT_FOUND[lang]);
    }
    return seller;
  },

  async userExists(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND[lang]);
    }
    return user;
  },
};

const changeStatus = async (id, status) => {
  await verify.saleExists(id);
  return Sale.update({ status }, { where: { id } });
};

const create = async (payload) => {
  const { sellerId, userId, products, totalPrice, deliveryAddress } = payload;
  await verify.sellerExists(sellerId);
  await verify.userExists(userId);

  const sale = await Sale.create({
    sellerId,
    userId,
    totalPrice,
    date: new Date(),
    deliveryAddress,
  });

  const promises = products.map(({ product: { id: productId }, quantity }) => {
    return SaleProduct.create({ saleId: sale.id, productId, quantity });
  });

  await Promise.all(promises);

  return sale;
};

const destroy = async (id) => {
  await verify.saleExists(id);
  return Sale.destroy({ where: { id } });
};

const findAll = async () => {
  return Sale.findAll({
    include: {
      model: SaleProduct,
      as: 'products',
      attributes: { exclude: ['productId', 'saleId'] },
      include: { model: Product, as: 'product' },
    },
  });
};

const findSale = async (id) => verify.saleExists(id);

module.exports = {
  changeStatus,
  create,
  destroy,
  findAll,
  findSale,
};
