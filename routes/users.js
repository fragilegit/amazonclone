const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/user');
const user_inst_contrl = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_inst_contrl.user_list);

router.get('/cool', function(req, res, next) {
  res.send("You're so cool");
});

module.exports = router;
