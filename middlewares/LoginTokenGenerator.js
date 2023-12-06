import createAccessToken from "../utils/jwt.js";

export const TokenGenerator = (req, res, next) => {
  const { username } = req.body;
  const accessToken = createAccessToken(username);
  req.accessToken = accessToken;
};
