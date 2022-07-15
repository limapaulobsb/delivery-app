const service = require('../services/salesService');

const changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await service.changeStatus(id, status);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = {
      sellerId: req.body.sellerId,
      userId: req.body.userId,
      products: req.body.products,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.body.deliveryAddress,
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

const findSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findSale(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeStatus,
  create,
  destroy,
  findAll,
  findSale,
};
