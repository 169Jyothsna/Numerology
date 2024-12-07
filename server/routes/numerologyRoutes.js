const express = require('express');
const { generateNumerology } = require('../controllers/numerologyController');

const router = express.Router();

router.post('/generate', generateNumerology);

module.exports = router;
