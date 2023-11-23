import express from "express";
import dotenv from "dotenv";
import sequelize from "./models/index.js";
import morgan from "morgan";
import User from "./models/user.js"; 

dotenv.config();

const app = express();
app.use(express.json());
// app.use(morgan('dev'));

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    // Synchronize models with the database
    await sequelize.sync({ alter: true });
    console.log("Database synced.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
