import jwt from "jsonwebtoken";

export const emailTokenValidator = (req, res, next) => {
  const { token } = req.query;
  if (!token)
    return res.status(400).json({ error: "User Email not Authenticated!" });

  try {
    const validToken = jwt.verify(token, process.env.TOKEN_SECRET_EMAIL_VERIFICATION);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// Not yet used
export const loginTokenValidator = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
  
    if (!accessToken)
      return res.status(400).json({ error: "User not Authenticated!" });
  
    try {
      const validToken = jwt.verify(accessToken, process.env.TOKEN_SECRET_EMAIL_VERIFICATION);
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };