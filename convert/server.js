const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session'); // Import express-session

const app = express();

// Connect to MongoDB (no deprecated options)
mongoose.connect("mongodb://127.0.0.1:27017/nodejs-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection error:", err));

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
  secret: 'your_secret_key', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static("public"));

// Middleware to make the session user data available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user; // This attaches the user data to all EJS templates
  next();
});

// Use routes
app.use('/', require('./routes/index'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  console.log(`Server running on http://127.0.0.1:${PORT}/home`);
});
