const express = require('express');
const controller = require('../controllers/usersController');
const router = express.Router();

router.get('', controller.getAll);
router.get('/search', controller.search);
router.post('', controller.store);

module.exports = router;
