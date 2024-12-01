import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Alredy Exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const users = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "Signup sucessfully",
      users: {
        _id: users.id,
        username: users.username,
        email: users.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isValidUser = await User.findOne({ email });
    if (!isValidUser) return next(errorHandler(404, "User Not Found"));
    const matchPassword = bcryptjs.compareSync(password, isValidUser.password);
    if (!matchPassword) return next(errorHandler(401, "Invalid credentials!"));
    const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = isValidUser._doc;
    res.cookie("UID", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
