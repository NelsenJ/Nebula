const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB (no deprecated options)
mongoose.connect("mongodb://127.0.0.1:27017/nodejs-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection error:", err));

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static("public"));

// Use routes
app.use('/', require('./routes/index'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

