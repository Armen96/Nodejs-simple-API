const express = require('express');
const controller = require('../app/controllers/UsersController');
const router = express.Router();
const passport = require('passport');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('', passport.authenticate('jwt', { session: false }), controller.index);

module.exports = router;
