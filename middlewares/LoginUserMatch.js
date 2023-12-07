import User from "../models/user.js";
import bcrypt from "bcrypt";

export const UserInfoValidator = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: "User Not found" });
  }
  const inValidPassword = await bcrypt.compare(password, user?.password);
  if (!inValidPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }
  console.log("Info validator", user.password, inValidPassword);
  req.userId = user.id;

  next();
};
