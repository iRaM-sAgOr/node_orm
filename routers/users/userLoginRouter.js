import express from "express";
import { loginUserValidator } from "../../middlewares/UserValidation.js";
import { UserInfoValidator } from "../../middlewares/LoginUserMatch.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
import UserToken from "../../models/user_token.js";

const loginRouter = express.Router();

loginRouter.post(
  "/",
  loginUserValidator,
  UserInfoValidator,
  async (req, res) => {
    const { username } = req.body;
    const accessToken = await createAccessToken(username);
    const refreshToken = await createRefreshToken(username);
    console.log("Login User Id", req.userId);
    await UserToken.create({
      user_id: req.userId,
      refreshToken,
    });
    res
      .status(200)
      .json({ message: "login success", accessToken, refreshToken });
  }
);

export default loginRouter;
