const { errorMessages, settings, verifyToken } = require('../utils');
const { Product, Sale, Seller } = require('../../database/models');

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
      // Access conditions
      // Falsy values indicate that only administrators have access
      // Missing methods will get a truthy condition value,
      // which means everyone with a valid token will be authorized
      case '/products/:id/seller': {
        permissions = {
          PATCH: false,
        };
        break;
      }
      case '/products/:id': {
        const product = await Product.findByPk(paramsId, {
          include: { model: Seller, as: 'seller' },
        });
        permissions = {
          PUT: sessionId === product?.seller.userId,
          DELETE: sessionId === product?.seller.userId,
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
      case '/sales/:id/status': {
        const sale = await Sale.findByPk(paramsId, {
          include: { model: Seller, as: 'seller' },
        });
        permissions = {
          PATCH: sessionId === sale?.seller.userId,
        };
        break;
      }
      case '/sales/:id': {
        const sale = await Sale.findByPk(paramsId, {
          include: { model: Seller, as: 'seller' },
        });
        permissions = {
          GET: sessionId === sale?.seller.userId || sessionId === sale?.userId,
          DELETE: sessionId === sale?.seller.userId,
        };
        break;
      }
      case '/sales':
        permissions = {
          GET: false,
        };
        break;
      case '/sellers/:id/user': {
        permissions = {
          PATCH: false,
        };
        break;
      }
      case '/sellers/:id': {
        const seller = await Seller.findByPk(paramsId);
        permissions = {
          PUT: sessionId === seller?.userId,
          DELETE: sessionId === seller?.userId,
        };
        break;
      }
      case '/sellers':
        permissions = {
          POST: false,
        };
        break;
      case '/users/:id/password':
        permissions = {
          PATCH: sessionId === paramsId,
        };
        break;
      case '/users/:id/role':
        permissions = {
          PATCH: false,
        };
        break;
      case '/users/:id':
        permissions = {
          GET: sessionId === paramsId,
          PUT: sessionId === paramsId,
          DELETE: sessionId === paramsId,
        };
        break;
      case '/users':
        permissions = {
          GET: false,
        };
        break;
      default:
        break;
    }

    const condition = permissions[method] ?? true;

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
