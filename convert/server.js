const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/nodejs-app")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Database connection error:", err));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  console.log(`Server running on http://127.0.0.1:${PORT}/home`);
});
