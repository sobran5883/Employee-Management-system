import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials for user:", email);
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    // Increment login count
    user.loginCount = (user.loginCount || 0) + 1;

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const existingEntry = user.loginHistory.find(entry =>
      entry.date.toISOString().split("T")[0] === today
    );

    if (existingEntry) {
      existingEntry.count += 1; // Increment count for today
    } else {
      user.loginHistory.push({ date: new Date(), count: 1 }); // Add new entry for today
    }
    // Save updated user
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "2d" });
    console.log("JWT Token generated:", token);

    // Send response
    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong.", error });
  }
};


//middleware for authentication validation
export const verify = (req, res)=>{
    try {
        const user = req.user; // This is set by authMiddleware
        return res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" });
    }
}


//login history
export const getLast7DaysLogins = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assume req.user is populated via authentication middleware
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    });

    const last7DaysData = last7Days.map(date => {
      const entry = user.loginHistory.find(entry => entry.date.toISOString().split("T")[0] === date);
      return { date, count: entry ? entry.count : 0 };
    });

    return res.status(200).json({ success: true, data: last7DaysData });
  } catch (error) {
    console.error("Error fetching last 7 days login data:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

