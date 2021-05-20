const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controllers");

// const checkAuth = require('../middlewares/isauth');

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("username").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

router.post(
  "/signin",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signin
);

module.exports = router;
