import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { transporter } from "../utils/mail.js";
import { createTokens } from "../utils/jwt.js";

const userRouter = express.Router();

userRouter.post("/create", async (req, res) => {
  console.log("Create user req body", req.body);
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      value: "",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
      value: "",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = createTokens(email);

    // Send verification email
    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Email Verification",
      text: `Click this link to verify your email: https://jasmy.com/verify?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        // Handle email sending error
        res.status(500).json({
          success: false,
          message: "Error sending verification email",
        });
      } else {
        console.log("Email sent: " + info.response);

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
      }
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
});

export default userRouter;
