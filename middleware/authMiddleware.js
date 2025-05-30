import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found", success: false });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};
