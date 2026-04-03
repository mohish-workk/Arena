const express = require('express');
const router = express.Router();
const { getAllBundles } = require('../controllers/bundleController');

// GET /api/bundles
router.get('/', getAllBundles);

module.exports = router;
