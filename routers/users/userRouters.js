import express from "express";
import createUserRouter from "./createUserRouter.js";
import varifyUserRouter from "./varifyUserRouter.js";

const userRouter = express.Router();

userRouter.use("/create", createUserRouter);
userRouter.use("/verify", varifyUserRouter);

export default userRouter;
