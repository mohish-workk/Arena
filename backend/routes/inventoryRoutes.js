const express = require('express');
const router = express.Router();
const { getItemTimeline, getInventoryLedger, logItemEvent } = require('../controllers/inventoryController');

// For now, these are open, but in a production app they'd have auth middleware
// GET /api/inventory/:itemId/timeline
router.get('/:itemId/timeline', getItemTimeline);

// GET /api/crm/inventory
router.get('/crm/ledger', getInventoryLedger);

// POST /api/crm/inventory/:itemId/log
router.post('/crm/:itemId/log', logItemEvent);

module.exports = router;
