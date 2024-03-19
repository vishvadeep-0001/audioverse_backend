import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/sendToken.js";

// Register
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exist", 409));

  user = await User.create({
    name,
    email,
    password,
  });
  sendToken(res, user, "registered Successfully", 201);
});

// Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("User Does'nt exist", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

// Logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});
