import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY); // Use same secret as in login
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(401).json({ success: false, error: "Invalid token or authentication failed" });
  }
};


export default authMiddleware;
