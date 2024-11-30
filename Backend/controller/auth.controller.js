import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
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
    res.status(500).json({
      message: `Internal Server error ${error}`,
    });
  }
};
