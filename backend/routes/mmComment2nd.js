const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

comment2ndCtrl = require('../controllers/mmComment2nd');

router.post('/commentOnComment', auth, comment2ndCtrl.commentOnComment);
router.put('/comment2nd/:id', auth, comment2ndCtrl.modifyComment2nd);
router.delete('/comment2nd/:id', auth, comment2ndCtrl.deleteComment2nd);
router.post('/comment2nd/:id/likes', auth, comment2ndCtrl.likeComment2nd);

module.exports = router;