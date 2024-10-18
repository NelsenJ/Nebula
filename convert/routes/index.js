const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

//first
router.get('/', (req, res) => {
  res.render('sign');
});


//profile
router.get('/profile', (req, res) => {
  res.render('profile');
});

//home
router.get('/home', (req, res) => {
  res.render('home');
});

//edukasi
router.get('/education', (req, res) => {
  res.render('education');
});

//Intro
router.get('/introduction', (req, res) => {
  res.render('introduction');
});

//health-stats
router.get('/health-stats', (req, res) =>{
  res.render('health-status');
})

//calc
router.get('/calc', (req, res) =>{
  res.render('calc');
})

router.post('/sign', async (req, res) => {
  const { name, gender, height, weight } = req.body;

  const newUser = new User({
    name: name,
    gender: gender,
    height: height,
    weight: weight
  });

  try {
    await newUser.save();
    console.log('User saved:', newUser);

    res.redirect('/home');
  } catch (err) {
    // Handle any errors that occur while saving
    console.error('Error saving user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;