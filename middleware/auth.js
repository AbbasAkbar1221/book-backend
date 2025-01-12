require('dotenv').config();

const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(400).json({ message: "You need to login" });
    }
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, token_data) {
        if (err) {
          return res.status(400).json({ message: "Forbidden", error: err });
        }
        req.user = token_data.user;
        next();
      }
    );
  }

  module.exports={
    authenticateToken
  }
  