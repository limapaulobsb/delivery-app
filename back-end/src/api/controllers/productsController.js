const service = require('../services/productsService');

const changeSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.body;
    await service.changeSeller(id, sellerId);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = {
      sellerId: req.body.sellerId,
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };
    const { id } = await service.create(payload);
    return res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.destroy(id);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const result = await service.findAll();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findProduct(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };
    await service.update(id, payload);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeSeller,
  create,
  destroy,
  findAll,
  findProduct,
  update,
};
