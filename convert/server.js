const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Blog = require("./models/userModel");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


const dbURI = "mongodb://127.0.0.1:27017/nodejs-app";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to db");
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));



// Routes (using the index router)
app.use('/', require('./routes/index'));

