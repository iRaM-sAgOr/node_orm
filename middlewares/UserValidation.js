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

// During login api hit, this middleware will check 
// the necessary values are present or not in request
export const loginUserValidator = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
      value: "",
    });
  }
  next();
};
