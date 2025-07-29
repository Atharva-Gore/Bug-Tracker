const express = require('express');
const router = express.Router();
const Bug = require('../models/Bug');

router.get('/', async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
});

router.post('/', async (req, res) => {
  const bug = new Bug(req.body);
  await bug.save();
  res.json(bug);
});

module.exports = router;
