const { Router } = require('express');

const auth = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validationMiddleware');
const controller = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.patch('/sales/:id/status', auth, validation, controller.changeStatus);
salesRoute.get('/sales/:id', auth, controller.findSale);
salesRoute.delete('/sales/:id', auth, controller.destroy);
salesRoute.post('/sales', auth, validation, controller.create);
salesRoute.get('/sales', auth, controller.findAll);

module.exports = salesRoute;
