const service = require('../services/sellersService');

const create = async (req, res, next) => {
  try {
    const payload = {
      userId: req.body.userId,
      name: req.body.name,
      category: req.body.category,
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

const findSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findSeller(id);
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
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    };
    await service.update(id, payload);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  destroy,
  findAll,
  findSeller,
  update,
};