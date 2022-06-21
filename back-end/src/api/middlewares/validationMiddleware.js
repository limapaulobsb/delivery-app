function validationMiddleware({ body }, _res, next) {
  const { category, email, imageUrl, name, password, role } = body;

  if ('category' in body && category.length < 6) {
    throw new Error('Invalid category');
  }

  if ('email' in body && !(email && /\S+@\S+\.\S+/.test(email))) {
    throw new Error('Invalid email');
  }

  if ('imageUrl' in body && imageUrl.length < 20) {
    throw new Error('Invalid image URL');
  }

  if ('name' in body && name.length < 6) {
    throw new Error('Invalid name');
  }

  if ('password' in body && password.length < 6) {
    throw new Error('Invalid password');
  }

  if ('role' in body && !['customer', 'seller', 'admin'].includes(role)) {
    throw new Error('Invalid role');
  }

  next();
}

module.exports = validationMiddleware;
