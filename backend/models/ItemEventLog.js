const mongoose = require('mongoose');

const itemEventLogSchema = new mongoose.Schema({
    inventoryItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryItem',
        required: true
    },
    eventType: {
        type: String,
        enum: ['Trip', 'Cleaned', 'Repaired', 'Inspection'],
        required: true
    },
    eventDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    loggedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('ItemEventLog', itemEventLogSchema);
