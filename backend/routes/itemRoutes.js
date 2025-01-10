const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { getItem, getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');

router.get('/:inventoryId/items/:itemId', authenticate, getItem);
router.get('/:inventoryId/items', authenticate, getItems);
router.post('/:inventoryId/items', authenticate, createItem);
router.put('/:inventoryId/items/:itemId', authenticate, updateItem);
router.delete('/:inventoryId/items/:itemId', authenticate, deleteItem);

module.exports = router;