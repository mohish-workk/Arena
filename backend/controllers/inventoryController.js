const InventoryItem = require('../models/InventoryItem');
const ItemEventLog = require('../models/ItemEventLog');

// GET /api/inventory/:itemId/timeline
exports.getItemTimeline = async (req, res) => {
    try {
        const { itemId } = req.params;
        
        // Find by ID or serial number
        const item = await InventoryItem.findOne({ 
            $or: [{ _id: itemId }, { serialNumber: itemId }] 
        }).populate('product', 'name dailyRate');

        if (!item) {
            return res.status(404).json({ success: false, error: 'Inventory Item not found' });
        }

        const logs = await ItemEventLog.find({ inventoryItem: item._id })
            .sort({ eventDate: -1 })
            .populate('loggedBy', 'name');

        res.status(200).json({
            success: true,
            data: {
                item,
                logs
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching item timeline' });
    }
};

// GET /api/crm/inventory
exports.getInventoryLedger = async (req, res) => {
    try {
        const inventory = await InventoryItem.find({})
            .populate('product', 'name category type')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error fetching inventory ledger' });
    }
};

// POST /api/crm/inventory/:itemId/log
exports.logItemEvent = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { eventType, description } = req.body;

        const item = await InventoryItem.findById(itemId);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }

        // Create log entry
        const log = await ItemEventLog.create({
            inventoryItem: itemId,
            eventType,
            description,
            loggedBy: req.user ? req.user._id : null
        });

        // Business Logic: Update Item Status based on event
        if (eventType === 'Cleaned' || eventType === 'Repaired') {
            item.status = 'Available';
            item.lastMaintenanceDate = new Date();
        } else if (eventType === 'Trip') {
            item.totalTrips += 1;
        }

        await item.save();

        res.status(201).json({
            success: true,
            data: log,
            itemStatus: item.status
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error logging item event' });
    }
};
