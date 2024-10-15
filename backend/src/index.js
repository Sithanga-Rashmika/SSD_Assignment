const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs'); 
require("dotenv").config();
const medicineRouter = require('./routes/medicineRoute.js');
const dogRouter = require('./routes/dogRouter');
const rescuedDogRouter = require("./routes/rescuedDogRoute.js");
const appointmentRouter = require("./routes/Appointment-routes.js");
const userRouter = require("./routes/User-routes");
const salesRouter = require("./routes/salesRoute.js");

const app = express();
app.disable('x-powered-by');

const helmet = require('helmet');

// Set security headers
app.use((req, res, next) => { 
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self' cdn.example.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );
  next();
});


// CORS Options
const corsOptions = {
  origin: [
    "https://localhost:3000",
    "http://localhost:3000",
    "https://localhost:3001",
    "http://localhost:3001"
  ],
  exposedHeaders: ['x-skip', 'x-limit', 'x-total'], 
};

// Use CORS middleware


app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.use('/medicine', medicineRouter);
app.use('/dog', dogRouter);
app.use("/createRescuedDog", rescuedDogRouter);
app.use("/appointment", appointmentRouter);
app.use("/user", userRouter);
app.use("/sales", salesRouter);

app.use('/api/auth', require('./routes/authenticationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/suser', require('./routes/suserRoutes'));

// Sanitize user data to avoid Private IP Disclosure
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    // Sanitize response to exclude sensitive information
    const sanitizedUserData = {
      username: user.username,
      email: user.email,
      // Do not include private IP addresses or sensitive info
    };
    
    res.json({
      status: "success",
      data: sanitizedUserData,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching user data." });
  }
});

// Sanitize appointment data to avoid Private IP Disclosure
app.get('/appointment/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    // Sanitize response to avoid disclosing private data
    const sanitizedAppointmentData = {
      date: appointment.date,
      time: appointment.time,
      // Do not include any private IP information
    };
    
    res.json({
      status: "success",
      data: sanitizedAppointmentData,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching appointment data." });
  }
});

// Database initialization
const initialize = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECT_URL);
    console.log("Mongodb connection success!");
  } catch (e) {
    console.log(e);
  }
};

// Start the server with HTTPS
const startServer = async () => {
  await initialize();

  // Read the SSL certificate and private key files
  const privateKey = fs.readFileSync('./cert/key.pem', 'utf8');
  const certificate = fs.readFileSync('./cert/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  // Create an HTTPS server
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(process.env.PORT || 8000, () => {
    console.log('Server started with HTTPS');
  });
};

// Default route
app.route("/").get((req, res) => {
  res.send("Secure Software Development Assignment Backend");
});

// Start the server
startServer();
