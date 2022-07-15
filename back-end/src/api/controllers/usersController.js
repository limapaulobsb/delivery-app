const service = require('../services/usersService');

const changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    await service.changePassword(id, password);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const changeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await service.changeRole(id, role);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

const findUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findUser(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const findUserSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.findUserSales(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await service.login(email, password);
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
      email: req.body.email,
    };
    await service.update(id, payload);
    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changePassword,
  changeRole,
  create,
  destroy,
  findAll,
  findUser,
  findUserSales,
  login,
  update,
};
