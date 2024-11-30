import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
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
