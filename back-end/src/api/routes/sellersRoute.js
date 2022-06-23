const { Router } = require('express');

const userAuth = require('../middlewares/authMiddleware');
const bodyValidation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/sellersController');

const sellersRoute = Router();

sellersRoute.get('/sellers/:id', userAuth, controller.findSeller);
sellersRoute.put('/sellers/:id', userAuth, bodyValidation, controller.update);
sellersRoute.patch('/sellers/:id', userAuth, controller.changeUser);
sellersRoute.delete('/sellers/:id', userAuth, controller.destroy);
sellersRoute.post('/sellers', userAuth, bodyValidation, controller.create);
sellersRoute.get('/sellers', userAuth, controller.findAll);

module.exports = sellersRoute;
