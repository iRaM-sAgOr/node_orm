// const { sign, verify } = require("jsonwebtoken");
import jwt from "jsonwebtoken";

export const createTokens = (email) => {
  const accessToken = jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return accessToken;
};

export const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// module.exports = { createTokens, validateToken };
