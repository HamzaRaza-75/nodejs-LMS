const jwt = require('jsonwebtoken');
const { secret_key } = require('@config');

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

function createToken(object) {
  return new Promise((resolve, reject) => {
    jwt.sign(object, secret_key, { expiresIn: '4d' }, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

module.exports = { verifyToken, createToken };
