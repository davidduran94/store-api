const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);
