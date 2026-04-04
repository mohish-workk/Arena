const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    serialNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Available', 'Rented', 'Maintenance', 'Retired'],
        default: 'Available'
    },
    lastMaintenanceDate: {
        type: Date
    },
    totalTrips: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
