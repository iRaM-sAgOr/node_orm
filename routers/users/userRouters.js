import express from "express";
import createUserRouter from "./createUserRouter.js";
import varifyUserRouter from "./varifyUserRouter.js";
import loginRouter from "./userLoginRouter.js";

const userRouter = express.Router();

userRouter.use("/create", createUserRouter);
userRouter.use("/verify", varifyUserRouter);

userRouter.use("/login", loginRouter);

export default userRouter;
