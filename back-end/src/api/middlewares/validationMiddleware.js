const { errorMessages, settings } = require('../utils');

const { language: lang, roles, statuses } = settings;

// Fields that must be validated depending on the route
// One '?' at the end indicates that the field is not required
const rules = {
  '/products/:id': {
    PUT: ['name', 'price', 'imageUrl?'],
  },
  '/products': {
    POST: ['name', 'price', 'imageUrl?'],
  },
  '/sales/:id/status': {
    PATCH: ['status'],
  },
  '/sales': {
    POST: ['products', 'totalPrice', 'deliveryAddress'],
  },
  '/sellers/:id': {
    PUT: ['name', 'category', 'imageUrl?'],
  },
  '/sellers': {
    POST: ['name', 'category', 'imageUrl?'],
  },
  '/users/:id/password': {
    PATCH: ['password'],
  },
  '/users/:id/role': {
    PATCH: ['role'],
  },
  '/users/:id': {
    PUT: ['name', 'email'],
  },
  '/users': {
    POST: ['name', 'email', 'password'],
  },
};

// This middleware performs body validations that are not database related
function validationMiddleware({ body, method, route }, _res, next) {
  const {
    category,
    deliveryAddress,
    email,
    imageUrl,
    name,
    password,
    price,
    products,
    role,
    status,
    totalPrice,
  } = body;

  const fields = rules[route.path][method];

  // Condition/Error Message Pairs
  const validations = {
    category: [category?.length >= 6, errorMessages.INVALID_CATEGORY[lang]],
    deliveryAddress: [deliveryAddress?.length >= 10, errorMessages.INVALID_ADDRESS[lang]],
    email: [/\S+@\S+\.\S+/.test(email), errorMessages.INVALID_EMAIL[lang]],
    imageUrl: [imageUrl?.length >= 20, errorMessages.INVALID_IMG_URL[lang]],
    name: [name?.length >= 6, errorMessages.INVALID_NAME[lang]],
    password: [password?.length >= 6, errorMessages.INVALID_PASSWORD[lang]],
    price: [typeof price === 'number', errorMessages.INVALID_PRICE[lang]],
    products: [Array.isArray(products), errorMessages.INVALID_PRODUCTS[lang]],
    role: [roles.includes(role), errorMessages.INVALID_ROLE[lang]],
    status: [statuses.includes(status), errorMessages.INVALID_STATUS[lang]],
    totalPrice: [typeof totalPrice === 'number', errorMessages.INVALID_TOTAL_PRICE[lang]],
  };

  let message = '';

  // For each field, checks its validation depending on the rules and conditions
  for (const field of fields) {
    const isRequired = field[field.length - 1] !== '?';
    const parsedField = isRequired ? field : field.slice(0, -1);
    const [condition] = validations[parsedField];

    if (isRequired && !(parsedField in body)) {
      message = errorMessages.MISSING_FIELD[lang];
      break;
    }

    if (parsedField in body && !condition) {
      [, message] = validations[parsedField];
      break;
    }
  }

  // Advances to the appropriate middleware
  if (!message) {
    next();
  } else {
    next(new Error(message));
  }
}

module.exports = validationMiddleware;
