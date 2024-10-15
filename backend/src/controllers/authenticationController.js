const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Suser = require("../models/Suser");

// Register Suser
exports.registerSuser = async (req, res, next) => {
  const { suserID, name, email, contactNumber, password } = req.body;

  // Check if all required fields are provided
  if (!suserID || !name || !email || !contactNumber || !password) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required to register a user.',
    });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await Suser.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    // Create a new user in the database
    const suser = await Suser.create({
      suserID,
      name,
      email: email.toLowerCase(), // Save email in lowercase for consistency
      contactNumber,
      password: hashedPassword,
    });

    // Send token for authentication
    sendToken(suser, 200, res);
  } catch (error) {
    console.error("Error during registration:", error.message);

    // Send a server error response
    res.status(500).json({
      success: false,
      error: 'An error occurred during user registration.',
      desc: error.message,
    });
  }
};

// Register Admin
exports.registerAdmin = async (req, res, next) => {
  const { email, phoneno, password } = req.body;

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      phoneno,
      password: hashedPassword, // Save hashed password
    });
    sendToken(admin, 201, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registerAdmin: " + error.message,
    });
  }
};

// Suser Login
exports.suserLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password presence
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide both email and password",
    });
  }

  try {
    // Find user by email (case-insensitive)
    const suser = await Suser.findOne({ email: email.toLowerCase() }).select("+password");

    // If user is not found
    if (!suser) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, suser.password);

    // If password does not match
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check your email and password",
      });
    }

    // Send token if credentials are valid
    sendToken(suser, 200, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error, please try again later.",
      message: error.message
    });
  }
};
// Admin Login
exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Please provide email and password",
    });
  }

  try {
    const admin = await Admin.findOne({ email: email }).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(admin, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Token sending function
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user });
};
