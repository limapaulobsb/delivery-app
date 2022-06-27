/* eslint-disable no-unused-vars */
const { errorMessages, settings } = require('../utils');

const lang = settings.language;

// This middleware handles errors and sends the appropriate response
function errorMiddleware(err, _req, res, _next) {
  // console.log(err);
  const errorRef = Object.values(errorMessages);
  const statusCode = errorRef.find((message) => message[lang] === err.message)?.CODE;
  if (statusCode) {
    return res.status(statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal error' });
}

module.exports = errorMiddleware;
