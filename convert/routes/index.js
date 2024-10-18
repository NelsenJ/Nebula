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

// Sign-in Page Route (GET)
router.get('/sign', (req, res) => {
  res.render('sign'); // Will render views/sign.ejs
});

// Education Page Route
router.get('/education', (req, res) => {
  res.render('education'); // Will render views/education.ejs
});

// Introduction Page Route
router.get('/introduction', (req, res) => {
  res.render('introduction'); // Will render views/introduction.ejs
});

router.get('/health-status', (req, res) => {
  res.render('statusKesehatan'); // Will render views/statusKesehatan.ejs
});

// POST Route for sign-in page to add a user to MongoDB
router.post('/sign', async (req, res) => {
  // Collect form data from the sign.ejs form
  const { name, gender, height, weight } = req.body;

  // Create a new User instance using the form data
  const newUser = new User({
    name: name,
    gender: gender,
    height: height,
    weight: weight
  });

  try {
    // Save the new user to MongoDB
    await newUser.save();
    console.log('User saved:', newUser);

    // Redirect to profile or home page (you can change this)
    res.redirect('/profile'); // Redirect after success
  } catch (err) {
    // Handle any errors that occur while saving
    console.error('Error saving user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
