const { Router } = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const controller = require('../controllers/sellersController');

const sellersRoute = Router();

sellersRoute.get('/sellers/:id', authMiddleware, controller.findSeller);
sellersRoute.put('/sellers/:id', authMiddleware, controller.update);
sellersRoute.delete('/sellers/:id', authMiddleware, controller.destroy);
sellersRoute.post('/sellers', authMiddleware, controller.create);
sellersRoute.get('/sellers', authMiddleware, controller.findAll);

module.exports = sellersRoute;
