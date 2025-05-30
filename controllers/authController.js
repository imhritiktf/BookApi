import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "3d" });

// registeer
export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both username and password" });
    }
    const existingUser = await User.findOne({ username });

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err});
    console.log(err)
  }
};

// login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });

    const token = createToken(user._id);

    res.status(200).cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    }).json({
        message: `Welcome, ${user.username}!`
    })
  } catch (error) {
    console.log(error)
  }
};

//logged Out
export const logout = (req, res) => {
  console.log("first")
  res.clearCookie('token').json({ message: 'Logged out' });
};

export const test2 = async(req, res)=>{
  console.log("Test route hit");
  res.send("Book route working");
}