const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Home Page Route
router.get('/', (req, res) => {
  res.render('home'); // Will render views/home.ejs (you will create this page)
});

// Profile Page Route
router.get('/profile', (req, res) => {
  res.render('profile'); // Will render views/profile.ejs
});

// Sign-in Page Route
router.get('/sign', (req, res) => {
  res.render('sign'); // Will render views/signin.ejs
});

// Education Page Route
router.get('/education', (req, res) => {
  res.render('education'); // Will render views/education.ejs
});

// Education Page Route
router.get('/introduction', (req, res) => {
  res.render('introduction'); // Will render views/education.ejs
});

// Example POST route to add a user to MongoDB (you can update as needed)
router.post('/addUser', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
