const { Product, Seller } = require('../../database/models');

const verify = {
  productDoesNotExist: async (name) => {
    const product = await Product.findOne({ where: { name } });
    if (product) {
      throw new Error('Name already used');
    }
  },

  productExists: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  sellerExists: async (sellerId) => {
    const seller = await Seller.findByPk(sellerId);
    if (!seller) {
      throw new Error('Seller not found');
    }
  },
};

const changeSeller = async (id, sellerId) => {
  await verify.productExists(id);
  await verify.sellerExists(sellerId);
  return Product.update({ sellerId }, { where: { id } });
};

const create = async (payload) => {
  const { sellerId, name, price, imageUrl } = payload;
  await verify.productDoesNotExist(name);
  await verify.sellerExists(sellerId);
  return Product.create({ sellerId, name, price, imageUrl });
};

const destroy = async (id) => {
  await verify.productExists(id);
  return Product.destroy({ where: { id } });
};

const findAll = async () => Product.findAll();

const findProduct = async (id) => verify.productExists(id);

const update = async (id, payload) => {
  const { name, price, imageUrl } = payload;
  const product = await verify.productExists(id);
  if (name !== product.name) {
    await verify.productDoesNotExist(name);
  }
  return Product.update({ name, price, imageUrl }, { where: { id } });
};

module.exports = {
  changeSeller,
  create,
  destroy,
  findAll,
  findProduct,
  update,
};
