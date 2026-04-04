const express = require('express');
const router = express.Router();
const { generateAdventure } = require('../controllers/aiController');

// POST /api/ai/generate-adventure
router.post('/generate-adventure', generateAdventure);

module.exports = router;
