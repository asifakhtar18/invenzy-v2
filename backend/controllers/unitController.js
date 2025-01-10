const Unit = require('../models/unit');

exports.getUnits = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const userId = req.user.id;
        const units = await Unit.find({ userId });

        if (!units) {
            return res.status(404).json({ error: 'No units found' });
        }

        res.status(200).json(units);
    } catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ error: 'Failed to fetch units' });
    }
};

exports.createUnit = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User not authenticated' });
        }

        const userId = req.user.id;
        const { name } = req.body;

        const unit = new Unit({ name, userId });
        await unit.save();

        res.status(201).json(unit);
    } catch (error) {
        console.error('Error creating unit:', error);
        res.status(500).json({ error: 'Failed to create unit' });
    }
};

