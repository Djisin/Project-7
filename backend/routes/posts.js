const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

postsCtrl = require('../controllers/posts');

router.post('/createPost', auth, multer, postsCtrl.createPost);
router.get('/', auth, postsCtrl.getAllPosts);
router.get('/:id', auth, postsCtrl.getOnePost)
router.put('/:id', auth, multer, postsCtrl.modifyPost)
router.delete('/:id', auth, postsCtrl.deletePost)
router.post('/:id/likes', auth, postsCtrl.likesPost)

module.exports = router;