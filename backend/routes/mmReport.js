const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

reportMMCtrl = require('../controllers/mmReport');

router.post('/report', auth, reportMMCtrl.submitReport);

module.exports = router;