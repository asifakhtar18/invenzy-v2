// api/models/Inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  description: {
    type: String,
    trim: true,
  },
  itemCount: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

inventorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

inventorySchema.methods.toJSON = function () {
  const inventory = this;
  const inventoryObject = inventory.toObject();

  delete inventoryObject.__v;

  return inventoryObject;
};

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;