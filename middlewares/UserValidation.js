

export const createUserDataValidation = (req, res, next) => {
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
    next();
  };