const express = require("express");
const {
  registerUser,
  generateAccessToken,
  loginUser,
} = require("../authControllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/token", generateAccessToken);

router.post("/login", loginUser);

module.exports = router;
