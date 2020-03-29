const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

commentCtrl = require('../controllers/comment');
//First level of comments
router.post('/comment', auth, commentCtrl.createComment);
router.delete('/comment/:id', auth, commentCtrl.deleteComment);
router.put('/comment/:id', auth, commentCtrl.modifyComment);
//Second level of comments
router.post('/commentOnComment', auth, commentCtrl.commentOnComment);
router.put('/comment2nd/:id', auth, commentCtrl.modifyComment2nd);
router.delete('/comment2nd/:id', auth, commentCtrl.deleteComment2nd);

router.post('/report', auth, commentCtrl.submitReport);

module.exports = router;