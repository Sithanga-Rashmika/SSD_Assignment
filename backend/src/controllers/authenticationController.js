const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Suser = require("../models/Suser");

// Register Suser
exports.registerSuser = async (req, res, next) => {
  const { suserID, name, email, contactNumber, password } = req.body;

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const suser = await Suser.create({
      suserID,
      name,
      email,
      contactNumber,
      password: hashedPassword,
    });
    sendToken(suser, 200, res);
  } catch (error) {
    res.status(500).json({
      error,
      desc: "Error occurred in registersuser: " + error.message,
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

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      desc: "Please provide email and password",
    });
  }
  try {
    const suser = await Suser.findOne({ email: email }).select("+password");

    if (!suser) {
      return res.status(404).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, suser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(suser, 200, res);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
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
