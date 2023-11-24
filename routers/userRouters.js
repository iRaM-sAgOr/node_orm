import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.post("/create", async (req, res) => {
  console.log("Create user req body", req.body);
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
    });
    res.send({
      success: true,
      message: "User Reg Successful",
      value: "",
    });
  } catch {
    res.send({
      success: false,
      message: "User Reg failed",
      value: "",
    });
  }
});

export default userRouter;
