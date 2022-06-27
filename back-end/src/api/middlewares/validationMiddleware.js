const { errorMessages, settings } = require('../utils');

const { language: lang, roles } = settings;

// Fields that must be validated depending on the route
// One '?' at the end indicates that the field is not required
const rules = {
  '/products/:id': {
    PUT: ['name', 'price', 'imageUrl?'],
  },
  '/products': {
    POST: ['name', 'price', 'imageUrl?'],
  },
  '/sellers/:id': {
    PUT: ['name', 'category', 'imageUrl?'],
  },
  '/sellers': {
    POST: ['name', 'category', 'imageUrl?'],
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
function validationMiddleware({ body, method, route }, _res, next) {
  const { category, email, imageUrl, name, password, price, role } = body;
  const fields = rules[route.path][method];
  let message = '';

  // Condition/Error Message Pairs
  const validations = {
    category: [category?.length >= 6, errorMessages.INVALID_CATEGORY[lang]],
    email: [/\S+@\S+\.\S+/.test(email), errorMessages.INVALID_EMAIL[lang]],
    imageUrl: [imageUrl?.length >= 20, errorMessages.INVALID_IMG_URL[lang]],
    name: [name?.length >= 6, errorMessages.INVALID_NAME[lang]],
    password: [password?.length >= 6, errorMessages.INVALID_PASSWORD[lang]],
    price: [typeof price === 'number', errorMessages.INVALID_PRICE[lang]],
    role: [roles.includes(role), errorMessages.INVALID_ROLE[lang]],
  };

  // For each field, checks its validation depending on the rules and conditions
  for (const field of fields) {
    const isRequired = field[field.length - 1] !== '?';
    const parsedField = isRequired ? field : field.slice(0, -1);
    const [condition] = validations[parsedField];

    if (isRequired && !body[parsedField]) {
      console.log(field);
      message = errorMessages.MISSING_FIELD[lang];
      break;
    }

    if (body[parsedField] && !condition) {
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
