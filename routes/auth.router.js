const express = require('express');
const passport = require('passport');
const jwtSign = require('../utils/jwt/token.sign');
const router = express.Router();

const generateJWT = (user) => {
  const payload = {
    sub: user.id,
    role: user.role,
  };
  return jwtSign(payload);
};

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      // mandar jwt
      res.json({ user: req.user, token: generateJWT(req.user) });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
