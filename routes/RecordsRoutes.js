const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/RecordsController');

router.get('', controller.index);
router.post('', controller.store);

module.exports = router;;
