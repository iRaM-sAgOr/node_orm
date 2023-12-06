import { transporter } from "../utils/mail.js";
import { createEmailVerificationTokens } from "../utils/jwt.js";

export const userVarificationMailSend = async (req, res, next) => {
  const { email } = req.body;
  const verificationToken = createEmailVerificationTokens(email);
  req.verificationToken = verificationToken;
  // Send verification email
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Email Verification",
    text: `Click this link to verify your email: ${process.env.GMAIL_VERIFYING_URL}/user/verify?token=${verificationToken}`,
  };

  await transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      // Handle email sending error
      res.status(500).json({
        success: false,
        message: "Error sending verification email",
      });
    } else {
      console.log("Email sent: " + info.response);
      next();
    }
  });
};
