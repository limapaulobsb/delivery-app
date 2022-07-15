const errorMessages = {
  // Body validation
  INVALID_ADDRESS: {
    CODE: 400,
    EN: 'Invalid field "deliveryAddress"',
    'PT-BR': 'Campo "deliveryAddress" inválido',
  },
  INVALID_CATEGORY: {
    CODE: 400,
    EN: 'Invalid field "category"',
    'PT-BR': 'Campo "category" inválido',
  },
  INVALID_EMAIL: {
    CODE: 400,
    EN: 'Invalid field "email"',
    'PT-BR': 'Campo "email" inválido',
  },
  INVALID_IMG_URL: {
    CODE: 400,
    EN: 'Invalid field "imageUrl"',
    'PT-BR': 'Campo "imageUrl" inválido',
  },
  INVALID_NAME: {
    CODE: 400,
    EN: 'Invalid field "name"',
    'PT-BR': 'Campo "name" inválido',
  },
  INVALID_PASSWORD: {
    CODE: 400,
    EN: 'Invalid field "password"',
    'PT-BR': 'Campo "password" inválido',
  },
  INVALID_PRICE: {
    CODE: 400,
    EN: 'Invalid field "price"',
    'PT-BR': 'Campo "price" inválido',
  },
  INVALID_PRODUCTS: {
    CODE: 400,
    EN: 'Invalid field "products"',
    'PT-BR': 'Campo "products" inválido',
  },
  INVALID_ROLE: {
    CODE: 400,
    EN: 'Invalid field "role"',
    'PT-BR': 'Campo "role" inválido',
  },
  INVALID_STATUS: {
    CODE: 400,
    EN: 'Invalid field "status"',
    'PT-BR': 'Campo "status" inválido',
  },
  INVALID_TOTAL_PRICE: {
    CODE: 400,
    EN: 'Invalid field "totalPrice"',
    'PT-BR': 'Campo "totalPrice" inválido',
  },
  INVALID_USER: {
    CODE: 400,
    EN: 'Invalid field "user"',
    'PT-BR': 'Usuário inválido',
  },
  MISSING_FIELD: {
    CODE: 400,
    EN: 'All fields must be filled',
    'PT-BR': 'Todos os campos devem ser preenchidos',
  },

  // Login
  WRONG_CREDENTIALS: {
    CODE: 400,
    EN: 'Wrong credentials',
    'PT-BR': 'E-mail e/ou senha inválidos',
  },

  // Token validation
  INVALID_TOKEN: {
    CODE: 401,
    EN: 'Token validation failed',
    'PT-BR': 'Token inválido',
  },
  TOKEN_EXPIRED: {
    CODE: 401,
    EN: 'Token expired',
    'PT-BR': 'Token expirado',
  },

  // Authorization
  FORBIDDEN: {
    CODE: 403,
    EN: 'Forbidden access',
    'PT-BR': 'Acesso não autorizado',
  },

  // Database validation
  PRODUCT_NOT_FOUND: {
    CODE: 404,
    EN: 'Product not found',
    'PT-BR': 'Produto não encontrado',
  },
  SALE_NOT_FOUND: {
    CODE: 404,
    EN: 'Sale not found',
    'PT-BR': 'Venda não encontrada',
  },
  SELLER_NOT_FOUND: {
    CODE: 404,
    EN: 'Seller not found',
    'PT-BR': 'Vendedor não encontrado',
  },
  TOKEN_NOT_FOUND: {
    CODE: 404,
    EN: 'Token not found',
    'PT-BR': 'Token não encontrado',
  },
  USER_NOT_FOUND: {
    CODE: 404,
    EN: 'User not found',
    'PT-BR': 'Usuário não encontrado',
  },

  EMAIL_USED: {
    CODE: 409,
    EN: 'E-mail already used',
    'PT-BR': 'E-mail já utilizado',
  },
  NAME_USED: {
    CODE: 409,
    EN: 'Name already used',
    'PT-BR': 'Nome já utilizado',
  },
};

module.exports = errorMessages;
