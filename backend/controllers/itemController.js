const Item = require('../models/Item');
const Inventory = require('../models/Inventory');

exports.createItem = async function (req, res) {
  try {
    const { inventoryId } = req.params;
    const { name, description, availableQuantity, unit, alertQuantity } = req.body;

    const inventory = await Inventory.findOne({ _id: inventoryId, userId: req.user.id });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const item = new Item({ name, description, availableQuantity, inventoryId, unit, alertQuantity });
    await item.save();

    inventory.itemCount += 1;
    await inventory.save();

    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
};

exports.updateItem = async function (req, res) {
  try {
    const { inventoryId, itemId } = req.params;
    const { name, description, availableQuantity, alertQuantity, unit } = req.body;

    const inventory = await Inventory.findOne({ _id: inventoryId, userId: req.user.id });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const item = await Item.findOneAndUpdate(
      { _id: itemId, inventoryId },
      { name, description, availableQuantity, alertQuantity, unit, updatedAt: Date.now() },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async function (req, res) {
  try {
    const { inventoryId, itemId } = req.params;

    const inventory = await Inventory.findOne({ _id: inventoryId, userId: req.user.id });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const item = await Item.findOneAndDelete({ _id: itemId, inventoryId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    inventory.itemCount -= 1;
    await inventory.save();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Error deleting item' });
  }
};

exports.getItem = async function (req, res) {
  try {
    const { inventoryId, itemId } = req.params;

    const inventory = await Inventory.findOne({ _id: inventoryId, userId: req.user.id });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const item = await Item.findOne({ _id: itemId, inventoryId });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error getting item:', error);
    res.status(500).json({ message: 'Error getting item' });
  }
};

exports.getItems = async function (req, res) {
  try {

    console.log(req.params)

    const { inventoryId } = req.params;


    const inventory = await Inventory.findOne({ _id: inventoryId, userId: req.user.id });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const items = await Item.find({ inventoryId });

    res.status(200).json(items);
  } catch (error) {
    console.error('Error getting items:', error);
    res.status(500).json({ message: 'Error getting items' });
  }
};