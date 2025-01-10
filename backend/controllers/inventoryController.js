const Inventory = require('../models/Inventory');

exports.getInventories = async function (req, res) {
  try {
    const inventories = await Inventory.find({ userId: req.user.id });
    res.status(200).json(inventories);
  } catch (error) {
    console.error('Error fetching inventories:', error);
    res.status(500).json({ message: 'Error fetching inventories' });
  }
};

exports.getInventory = async function (req, res) {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findOne({ _id: id, userId: req.user.id });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Error fetching inventory' });
  }
};

exports.createInventory = async function (req, res) {
  try {
    const { name, status } = req.body;
    const existingInventory = await Inventory.findOne({ name, userId: req.user.id });

    if (existingInventory) {
      return res.status(400).json({ message: 'Inventory already exists' });
    }

    const inventory = new Inventory({ name, status, userId: req.user.id });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (error) {
    console.error('Error creating inventory:', error);
    res.status(500).json({ message: 'Error creating inventory' });
  }
};

exports.updateInventory = async function (req, res) {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const inventory = await Inventory.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { name, status },
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Error updating inventory' });
  }
};

exports.deleteInventory = async function (req, res) {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res.status(500).json({ message: 'Error deleting inventory' });
  }
};