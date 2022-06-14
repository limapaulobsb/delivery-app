const statusCodes = {
  'Invalid email': 400,
  'Invalid name': 400,
  'Invalid password': 400,
  'Invalid role': 400,
  'Wrong credentials': 400,
  'Token expired': 401,
  'Token validation failed': 401,
  'Forbidden access': 403,
  'Token not found': 404,
  'User not found': 404,
  'User already exists': 409,
};

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, _req, res, _next) {
  const statusCode = statusCodes[err.message];
  if (statusCode) return res.status(statusCode).json({ message: err.message });
  console.log(err);
  return res.status(500).json({ message: 'Internal error' });
}

module.exports = errorMiddleware;
