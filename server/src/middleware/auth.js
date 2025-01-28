import User from '../models/User.js';  // Make sure to import User model
import { verifyToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token and get decoded payload (e.g., user ID)
    const decoded = verifyToken(token);

    // Find the user by ID and attach to the request object (excluding password)
    req.user = await User.findById(decoded.id).select("-password");

    // If no user found, return error
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token or token expired" });
  }
};
