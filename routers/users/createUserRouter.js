import express from "express";
import bcrypt from "bcrypt";
import User from "../../models/user.js";
import { createUserDataValidation } from "../../middlewares/UserValidation.js";
import { userVarificationMailSend } from "../../middlewares/UserVarificationMailSend.js";

const createUserRouter = express.Router();

createUserRouter.post(
    "/",
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

export default createUserRouter