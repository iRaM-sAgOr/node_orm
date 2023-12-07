import fs from "fs";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import sequelize from "./models/index.js";
import { UserTokenAssociation } from "./models/user_token_association.js";
import userRouter from "./routers/users/userRouters.js";

dotenv.config();

const app = express();
var logFile = fs.createWriteStream("./myLogFile.log", { flags: "a" });

app.use(express.json());
app.use(morgan("combined", { stream: logFile }));

app.use("/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    UserTokenAssociation();
    // Synchronize models with the database
    await sequelize.sync({ alter: false });
    console.log("Database synced.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
