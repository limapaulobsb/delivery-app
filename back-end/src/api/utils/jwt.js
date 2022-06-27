const fs = require('fs');
const jwt = require('jsonwebtoken');

function getSecret() {
  return fs
    .readFileSync(`${process.cwd()}/jwt.evaluation.key`, { encoding: 'utf-8' })
    .trim();
}

function createToken(payload) {
  const config = { expiresIn: '12h', algorithm: 'HS256' };
  const token = jwt.sign(payload, getSecret(), config);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, getSecret());
}

module.exports = {
  createToken,
  verifyToken,
};
