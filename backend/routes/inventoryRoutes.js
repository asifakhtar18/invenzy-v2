const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { getInventories, createInventory, updateInventory, deleteInventory, getInventory } = require('../controllers/inventoryController');

router.get('/', authenticate, getInventories);
router.get('/:id', authenticate, getInventory);
router.post('/', authenticate, createInventory);
router.put('/:id', authenticate, updateInventory);
router.delete('/:id', authenticate, deleteInventory);

module.exports = router;