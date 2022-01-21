const jwt = require('jsonwebtoken');
// OJO mandar a .env
const sec = '815d7ccf671020a19266abc80bf05f2920b6f0044e5f2f91669e20c1578f075e';

const verifyToken = (token, secret = sec) => {
  return jwt.verify(token, secret);
};

module.exports = verifyToken;
