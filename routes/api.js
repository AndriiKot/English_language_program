const express = require('express');
const { addPhrase } = require('../controllers/apiController');
const router = express.Router();

router.post('/add-phrase', addPhrase);

module.exports = router;

