require("dotenv").config();

const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refresh_tokens = new Set();

async function registerUser (req, res){
  try {
    const { name, password, email, role, borrowedBooks } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      role,
      password: hashPassword,
      borrowedBooks,
    });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message:error.message});
  }
}

async function generateAccessToken(req, res) {
  const refresh_token = req.body.token;

  if (!refresh_token) return res.status(401).json({ message: "Unauthorized" });

  if (!refresh_tokens.has(refresh_token))
    return res.status(403).json({ message: "You need to login" });

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, token_data) {
      if (err) {
        console.error("Token Verification Error:", err.message);
        return res
          .status(403)
          .json({ message: "Forbidden", error: err.message });
      }
      const token = generateToken({ user: token_data.userInfo });
    //   console.log(token_data);
      return res.json({ token });
    }
  );
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email" });
    }
    try {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  
    const userInfo = { email: user.email };
    const token_data = { userInfo };
  
    const token = generateToken(token_data);
  
    const refresh_token = jwt.sign(token_data, process.env.REFRESH_TOKEN_SECRET);
    refresh_tokens.add(refresh_token);
  
    return res.json({ token, refresh_token });
  }

  function generateToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2m",
    });
  }

  module.exports = {
    registerUser,
    generateAccessToken,
    loginUser,
  }