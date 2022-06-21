const { verifyToken } = require('../utils');
const { Seller } = require('../../database/models');

async function authMiddleware(req, _res, next) {
  try {
    // Validation of the JWT passed in the request
    req.session = verifyToken(req.headers.token);

    // Authorization conditions check depending on the route
    const {
      method,
      route: { path },
      session: { id: sessionId, role },
    } = req;

    const targetId = Number(req.params.id);

    let permissions = {};
    switch (path) {
      case '/sellers/:id': {
        const seller = await Seller.findByPk(targetId);
        permissions = {
          PUT: sessionId === seller?.userId,
          DELETE: sessionId === seller?.userId,
        };
        break;
      }
      case '/sellers':
        permissions = {
          POST: 0,
        };
        break;
      case '/users/:id/role':
        permissions = {
          PATCH: 0,
        };
        break;
      case '/users':
        permissions = {
          GET: sessionId === targetId,
        };
        break;
      case '/users/:id':
        permissions = {
          GET: sessionId === targetId,
          PUT: sessionId === targetId,
          DELETE: sessionId === targetId,
        };
        break;
      default:
        break;
    }

    const condition = permissions[method] ?? 1;

    if (condition || role === 'admin') {
      next();
    } else {
      next(new Error('Forbidden access'));
    }
  } catch (error) {
    // JWT validation can generate these errors
    switch (error.message) {
      case 'jwt must be provided':
        next(new Error('Token not found'));
        break;
      case 'jwt expired':
        next(new Error('Token expired'));
        break;
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        next(new Error('Token validation failed'));
        break;
      default:
        next(error);
        break;
    }
  }
}

module.exports = authMiddleware;
