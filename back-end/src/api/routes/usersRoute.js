const { Router } = require('express');

const auth = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.post('/users/login', controller.login);
usersRoute.patch('/users/:id/password', auth, validation, controller.changePassword);
usersRoute.patch('/users/:id/role', auth, validation, controller.changeRole);
usersRoute.get('/users/:id', auth, controller.findUser);
usersRoute.put('/users/:id', auth, validation, controller.update);
usersRoute.delete('/users/:id', auth, controller.destroy);
usersRoute.post('/users', validation, controller.create);
usersRoute.get('/users', auth, controller.findAll);

module.exports = usersRoute;
