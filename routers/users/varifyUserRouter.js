import express from "express";
import User from "../../models/user.js";
import { emailTokenValidator } from "../../middlewares/tokenValidator.js";

const varifyUserRouter = express.Router();

varifyUserRouter.get("/", emailTokenValidator, async (req, res) => {
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

export default varifyUserRouter;
