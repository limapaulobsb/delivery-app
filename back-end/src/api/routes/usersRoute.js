const { Router } = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.post('/users/login', controller.login);
usersRoute.patch('/users/:id/role', authMiddleware, controller.changeRole);
usersRoute.get('/users/:id', authMiddleware, controller.findUser);
usersRoute.put('/users/:id', authMiddleware, controller.update);
usersRoute.delete('/users/:id', authMiddleware, controller.destroy);
usersRoute.post('/users', controller.create);
usersRoute.get('/users', authMiddleware, controller.findAll);

module.exports = usersRoute;
