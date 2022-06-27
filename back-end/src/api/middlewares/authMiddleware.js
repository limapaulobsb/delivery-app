const { errorMessages, settings, verifyToken } = require('../utils');
const { Product, Seller } = require('../../database/models');

const lang = settings.language;

// This middleware handles token validation and access permissions
async function authMiddleware(req, _res, next) {
  try {
    // Validation of the JWT passed in the request
    req.session = verifyToken(req.headers.token);

    // Authorization check depending on the route
    const { body, method } = req;
    const { path } = req.route;
    const { id: sessionId, role } = req.session;
    const paramsId = Number(req.params.id);
    let permissions = {};

    switch (path) {
      case '/products/:id': {
        const product = await Product.findByPk(paramsId, { include: Seller });
        // Access conditions
        // Falsy values indicate that only administrators have access
        // Missing methods will get a truthy condition value,
        // which means everyone with a valid token will be authorized
        permissions = {
          PUT: sessionId === product?.Seller.userId,
          PATCH: 0,
          DELETE: sessionId === product?.Seller.userId,
        };
        break;
      }
      case '/products': {
        const seller = await Seller.findByPk(body.sellerId);
        permissions = {
          POST: sessionId === seller?.userId,
        };
        break;
      }
      case '/sellers/:id': {
        const seller = await Seller.findByPk(paramsId);
        permissions = {
          PUT: sessionId === seller?.userId,
          PATCH: 0,
          DELETE: sessionId === seller?.userId,
        };
        break;
      }
      case '/sellers':
        permissions = {
          POST: 0,
        };
        break;
      case '/users/:id':
        permissions = {
          GET: sessionId === paramsId,
          PUT: sessionId === paramsId,
          PATCH: 0,
          DELETE: sessionId === paramsId,
        };
        break;
      case '/users':
        permissions = {
          GET: 0,
        };
        break;
      default:
        break;
    }

    const condition = permissions[method] ?? 1;

    // Advances to the appropriate middleware
    if (condition || role === 'admin') {
      next();
    } else {
      next(new Error(errorMessages.FORBIDDEN[lang]));
    }
  } catch (error) {
    // JWT validation can generate these errors
    switch (error.message) {
      case 'jwt must be provided':
        next(new Error(errorMessages.TOKEN_NOT_FOUND[lang]));
        break;
      case 'jwt expired':
        next(new Error(errorMessages.TOKEN_EXPIRED[lang]));
        break;
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        next(new Error(errorMessages.INVALID_TOKEN[lang]));
        break;
      default:
        next(error);
        break;
    }
  }
}

module.exports = authMiddleware;
