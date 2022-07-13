const { Router } = require('express');

const auth = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/sellersController');

const sellersRoute = Router();

sellersRoute.get('/sellers/:id/products', controller.findSellerProducts);
sellersRoute.patch('/sellers/:id/user', auth, controller.changeUser);
sellersRoute.get('/sellers/:id', auth, controller.findSeller);
sellersRoute.put('/sellers/:id', auth, validation, controller.update);
sellersRoute.delete('/sellers/:id', auth, controller.destroy);
sellersRoute.post('/sellers', auth, validation, controller.create);
sellersRoute.get('/sellers', controller.findAll);

module.exports = sellersRoute;
