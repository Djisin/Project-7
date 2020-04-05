const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

reportCtrl = require('../controllers/report');

router.post('/report', auth, reportCtrl.submitReport);

module.exports = router;