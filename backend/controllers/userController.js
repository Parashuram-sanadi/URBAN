import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------------- REGISTER ----------------
export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log("Register attempt:", { email, password, role });

    // Validation
    if (!email || !password) {
      console.log("Register failed: Missing fields");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Register failed: User already exists ->", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role (default = user)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    console.log("User registered successfully:", email);

    // Send response
    res.status(201).json({
      message: "Registration successful",
      token,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found ->", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user.email);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Login failed: Wrong password for ->", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    console.log("Login success! Token generated for:", email);
    res.json({
      message: "Login successful",
      token,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
