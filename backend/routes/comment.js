const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

commentCtrl = require('../controllers/comment');

router.post('/comment', auth, commentCtrl.createComment);
router.delete('/comment/:id', auth, commentCtrl.deleteComment);
router.put('/comment/:id', auth, commentCtrl.modifyComment);
router.post('/comment/:id/like', auth, commentCtrl.likeComment)

module.exports = router;