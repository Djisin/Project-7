const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

commentCtrl = require('../controllers/mmComment');

router.post('/comment', auth, commentCtrl.createMMComment);
router.delete('/comment/:id', auth, commentCtrl.deleteMMComment);
router.put('/comment/:id', auth, commentCtrl.modifyMMComment);
router.post('/comment/:id/likes', auth, commentCtrl.likeMMComment)

module.exports = router;