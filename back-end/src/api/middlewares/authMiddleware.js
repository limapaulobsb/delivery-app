const { verifyToken } = require('../utils');

function authMiddleware(req, _res, next) {
  try {
    // Validation of the JWT passed in the request
    req.session = verifyToken(req.headers.token);
    
    // Authorization conditions check depending on the route
    const { path } = req.route;
    const { id: sessionId, role } = req.session;
    const targetId = Number(req.params.id);
    const verifyAuthorization = (condition) => {
      if (!condition) {
        next(new Error('Forbidden access'));
      } else {
        next();
      }
    };

    switch (path) {
      case '/users/:id/role':
      case '/users':
        verifyAuthorization(role === 'admin');
        break;
      case '/users/:id':
        verifyAuthorization(sessionId === targetId || role === 'admin');
        break;
      default:
        next();
        break;
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
