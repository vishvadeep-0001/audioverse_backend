import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  console.log(this.password);
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", schema);
