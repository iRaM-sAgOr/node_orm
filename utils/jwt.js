import jwt from "jsonwebtoken";

export const createTokens = (email) => {
  const accessToken = jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.EMAIL_TOKEN_VALIDATE_TIME,
  });
  return accessToken;
};
