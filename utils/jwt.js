import jwt from "jsonwebtoken";

export const createEmailVerificationTokens = (email) => {
  console.log("Email Token creation", email);
  const accessToken = jwt.sign(
    { email },
    process.env.TOKEN_SECRET_EMAIL_VERIFICATION,
    {
      expiresIn: process.env.EMAIL_TOKEN_VALIDATE_TIME,
    }
  );
  return accessToken;
};

export const createAccessToken = (username) => {
  const service = "jasmy_secured_login";
  const accessToken = jwt.sign(
    { username, service },
    process.env.TOKEN_SECRET_ACCESSTOKEN,
    {
      expiresIn: process.env.ACCESSTOKEN_EXPIRE_TIME,
    }
  );
  return accessToken;
};
