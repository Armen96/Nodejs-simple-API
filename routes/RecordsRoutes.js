const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/RecordsController');
const passport = require('passport');

router.get('', controller.index);
router.post('', passport.authenticate('jwt', { session: false }), controller.store);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.update);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.destroy);

module.exports = router;
