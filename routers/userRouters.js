import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { createUserDataValidation } from "../middlewares/UserValidation.js";
import { userVarificationMailSend } from "../middlewares/UserVarificationMailSend.js";

const userRouter = express.Router();

userRouter.post(
  "/create",
  createUserDataValidation,
  userVarificationMailSend,
  async (req, res) => {
    console.log("Create user req body", req.verificationToken);
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = req.verificationToken;

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        verificationToken,
      });
      // Respond with success message
      res.send({
        success: true,
        message: "User Reg Successful",
        value: newUser.id,
      });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        let errorMessage = "";
        if (err.fields.username) {
          errorMessage = "Username already exists";
        } else if (err.fields.email) {
          errorMessage = "Email already exists";
        }

        return res.status(400).json({
          success: false,
          message: errorMessage,
          value: "",
        });
      } else if (err.name === "SequelizeValidationError") {
        // Handling Sequelize validation errors
        const validationErrors = err.errors.map((error) => error.message);
        return res.status(400).json({
          success: false,
          message: validationErrors[0],
          value: "",
        });
      }

      console.log("Create User error", err);

      res.status(500).send({
        success: false,
        message: "User Reg failed",
        value: "",
      });
    }
  }
);

userRouter.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Mark the user as verified and clear verification token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (err) {
    console.error("Verification error:", err);
    // Handle verification error
    res
      .status(500)
      .json({ success: false, message: "Email verification failed" });
  }
});

export default userRouter;
