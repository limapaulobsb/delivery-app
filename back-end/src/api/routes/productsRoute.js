const { Router } = require('express');

const userAuth = require('../middlewares/authMiddleware');
const bodyValidation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/products/:id', controller.findProduct);
productsRoute.put('/products/:id', userAuth, bodyValidation, controller.update);
productsRoute.patch('/products/:id', userAuth, controller.changeSeller);
productsRoute.delete('/products/:id', userAuth, controller.destroy);
productsRoute.post('/products', userAuth, bodyValidation, controller.create);
productsRoute.get('/products', controller.findAll);

module.exports = productsRoute;
