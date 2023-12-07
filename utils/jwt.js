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

// After login this access token will be sent
export const createAccessToken = (username) => {
  const service_provider = "jasmy_secured_login";
  const type = "access token";
  const accessToken = jwt.sign(
    { username, service_provider, type },
    process.env.TOKEN_SECRET_ACCESSTOKEN,
    {
      expiresIn: process.env.ACCESSTOKEN_EXPIRE_TIME,
    }
  );
  return accessToken;
};

// After login this access token will be sent
export const createRefreshToken = (username) => {
  const service_provider = "jasmy_secured_login";
  const type = "refresh token";
  const refreshToken = jwt.sign(
    { username, service_provider, type },
    process.env.TOKEN_SECRET_REFRESHTOKEN,
    {
      expiresIn: process.env.REFRESHTOKEN_EXPIRE_TIME,
    }
  );
  return refreshToken;
};
