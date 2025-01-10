const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth');
const { getUnits, createUnit } = require('../controllers/unitController');


router.get('/', authenticate, getUnits);
router.post('/', authenticate, createUnit);

module.exports = router;