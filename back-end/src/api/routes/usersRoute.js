const { Router } = require('express');

const userAuth = require('../middlewares/authMiddleware');
const bodyValidation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/usersController');

const usersRoute = Router();

usersRoute.post('/users/login', controller.login);
usersRoute.get('/users/:id', userAuth, controller.findUser);
usersRoute.put('/users/:id', userAuth, bodyValidation, controller.update);
usersRoute.patch('/users/:id', userAuth, bodyValidation, controller.changeRole);
usersRoute.delete('/users/:id', userAuth, controller.destroy);
usersRoute.post('/users', bodyValidation, controller.create);
usersRoute.get('/users', userAuth, controller.findAll);

module.exports = usersRoute;
