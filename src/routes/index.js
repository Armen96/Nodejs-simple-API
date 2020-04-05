const express = require('express');
const usersController = require('../app/controllers/UsersController');
const recordsController = require('../app/controllers/RecordsController');
const roomsController = require('../app/controllers/RoomsController');
const router = express.Router();
const passport = require('passport');

/**
 * Users
 */
router.post('/users/login', usersController.login);
router.post('/users/register', usersController.register);
router.post('/users/search', passport.authenticate('jwt', { session: false }), usersController.search);
router.post('/users/room', passport.authenticate('jwt', { session: false }), roomsController.getRoom);
router.post('/users/friend', passport.authenticate('jwt', { session: false }), usersController.addFriend);
router.get('/users', usersController.index);

/**
 * Records
 */
router.get('/records', recordsController.index);
router.post('/records', passport.authenticate('jwt', { session: false }), recordsController.store);
router.get('/records/:id', passport.authenticate('jwt', { session: false }), recordsController.update);
router.put('/records/:id', passport.authenticate('jwt', { session: false }), recordsController.edit);
router.delete('/records/:id', passport.authenticate('jwt', { session: false }), recordsController.destroy);

export default router;
