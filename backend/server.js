require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const unitRoutes = require('./routes/unitRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: '*',
    }
));

mongoose.connect(process.env.MONGODB_URI);


app.use('/api/auth', authRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/inventories', inventoryRoutes);
app.use('/api/items/inventories', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
