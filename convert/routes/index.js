const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const recipes = require('../data/recipes.json');

router.use(express.json());

router.get('/', (req, res) => {
  res.render('sign');
});

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.session.user });
});

router.get('/home', (req, res) => {
  res.render('home', { user: req.session.user });
});

router.get('/education', (req, res) => {
  res.render('education', { user: req.session.user });
});

router.get('/introduction', (req, res) => {
  res.render('introduction', { user: req.session.user });
});

router.get('/health-stats', (req, res) => {
  res.render('health-status', { user: req.session.user });
});

router.get('/recipes', (req, res) => {
  res.render('recipes', { user: req.session.user, recipes });
});

router.get('/recipe-info/:id', (req, res) => {
  const recipeId = req.params.id;
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) {
    return res.status(404).send("Recipe not found");
  }

  res.render('recipe-info', { user: req.session.user, recipe });
});


router.get('/calc', (req, res) => {
  res.render('calc', { user: req.session.user });
});

router.post('/', async (req, res) => {
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

    req.session.user = {
      name: newUser.name,
      gender: newUser.gender,
      height: newUser.height,
      weight: newUser.weight
    };

    res.json({ message: 'User data saved and session created!' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Error saving user data' });
  }
});

module.exports = router;
