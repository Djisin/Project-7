const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

searchCtrl = require('../controllers/search');

router.post('/search', auth, searchCtrl.search);

module.exports = router; 