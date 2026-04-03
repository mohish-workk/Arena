const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const InventoryItem = require('./models/InventoryItem');
const ItemEventLog = require('./models/ItemEventLog');

require('dotenv').config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arena');
        console.log('Connected to DB...');

        // 1. Create a Product
        const product = await Product.create({
            name: "Quechua 3-Person Explorer Tent",
            description: "High-end mountain tent for 3 people.",
            category: "Camping",
            dailyRate: 450,
            image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800",
            features: ["Waterproof", "UV Protected", "Easy Setup"],
            type: "rental"
        });

        // 2. Create 3 physical units (InventoryItems)
        const items = await InventoryItem.insertMany([
            { product: product._id, serialNumber: "QTENT-001", status: "Available", totalTrips: 5 },
            { product: product._id, serialNumber: "QTENT-002", status: "Maintenance", totalTrips: 12 },
            { product: product._id, serialNumber: "QTENT-003", status: "Available", totalTrips: 2 }
        ]);

        // 3. Create some logs for the first unit
        await ItemEventLog.insertMany([
            { inventoryItem: items[0]._id, eventType: "Cleaned", description: "Deep sanitization after long trip." },
            { inventoryItem: items[0]._id, eventType: "Trip", description: "Rented by User for Pawna Lake trip." },
            { inventoryItem: items[1]._id, eventType: "Inspection", description: "Found minor tear in rainfly. Moving to maintenance." }
        ]);

        console.log('Seed successful!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
