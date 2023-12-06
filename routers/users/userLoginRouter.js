import express from "express";
import { loginUserValidator } from "../../middlewares/UserValidation.js";
import User from "../../models/user.js";

const loginRouter = express.Router();

loginRouter.post("/", loginUserValidator, (req, res) => {
  res.status(200).json({ message: "login success" });
});

export default loginRouter;
