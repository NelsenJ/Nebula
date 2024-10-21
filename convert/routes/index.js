const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// First route - sign page
router.get('/', (req, res) => {
  res.render('sign');
});

// Profile route
router.get('/profile', (req, res) => {
  res.render('profile', { user: req.session.user });
});

// Home route
router.get('/home', (req, res) => {
  res.render('home', { user: req.session.user });
});

// Education route
router.get('/education', (req, res) => {
  res.render('education', { user: req.session.user });
});

// Introduction route
router.get('/introduction', (req, res) => {
  res.render('introduction', { user: req.session.user });
});

// Health stats route
router.get('/health-stats', (req, res) => {
  res.render('health-status', { user: req.session.user });
});

// Recipe route
router.get('/recipes', (req, res) => {
  res.render('recipes', { user: req.session.user });
});

// Handle form submission from the sign-in page
router.post('/sign', async (req, res) => {
  const { name, gender, height, weight } = req.body;

  const newUser = new User({
    name: name,
    gender: gender,
    height: height,
    weight: weight
  });

  try {
    // Save the user data in the database
    await newUser.save();
    console.log('User saved:', newUser);
    // Store the user data in the session
    req.session.user = {
      name: newUser.name,
      gender: newUser.gender,
      height: newUser.height,
      weight: newUser.weight
    };

    // Redirect to the home page after submission
    res.redirect('/home');
  } catch (err) {
    // Handle any errors that occur while saving
    console.error('Error saving user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;