const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const bundleRoutes = require('./routes/bundleRoutes');
const aiRoutes = require('./routes/aiRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Initialize config
dotenv.config();

// Mongoose initialization
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/bundles', bundleRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
