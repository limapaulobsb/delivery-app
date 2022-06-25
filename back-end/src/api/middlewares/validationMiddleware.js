const rules = {
  '/products/:id': {
    PUT: ['name', 'price', 'imageUrl'],
  },
  '/products': {
    POST: ['name', 'price', 'imageUrl'],
  },
  '/sellers/:id': {
    PUT: ['name', 'category', 'imageUrl'],
  },
  '/sellers': {
    POST: ['name', 'category', 'imageUrl'],
  },
  '/users/:id': {
    PUT: ['name', 'email', 'password'],
    PATCH: ['role'],
  },
  '/users': {
    POST: ['name', 'email', 'password'],
  },
};

// This middleware performs body validations that are not database related
function validationMiddleware(req, _res, next) {
  const { method } = req;
  const { category, email, imageUrl, name, password, price, role } = req.body;
  const { path } = req.route;
  const fields = rules[path][method];

  const validations = {
    category: [category?.length >= 6, 'Invalid category'],
    email: [/\S+@\S+\.\S+/.test(email), 'Invalid email'],
    imageUrl: [!imageUrl || imageUrl.length >= 20, 'Invalid image URL'],
    name: [name?.length >= 6, 'Invalid name'],
    password: [password?.length >= 6, 'Invalid password'],
    price: [typeof price === 'number', 'Invalid price'],
    role: [['customer', 'seller', 'admin'].includes(role), 'Invalid role'],
  };

  let message = '';

  for (const field of fields) {
    const [condition] = validations[field];
    if (!condition) {
      [, message] = validations[field];
      break;
    }
  }

  if (!message) {
    next();
  } else {
    next(new Error(message));
  }
}

module.exports = validationMiddleware;
