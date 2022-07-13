const { Router } = require('express');

const auth = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.patch('/products/:id/seller', auth, controller.changeSeller);
productsRoute.get('/products/:id', controller.findProduct);
productsRoute.put('/products/:id', auth, validation, controller.update);
productsRoute.delete('/products/:id', auth, controller.destroy);
productsRoute.post('/products', auth, validation, controller.create);
productsRoute.get('/products', controller.findAll);

module.exports = productsRoute;
