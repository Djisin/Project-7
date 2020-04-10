const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

postsMMCtrl = require('../controllers/mmPosts');

router.post('/createPost', auth, multer, postsMMCtrl.createMMPost);
router.get('/', auth, postsMMCtrl.getAllMMPosts);
router.get('/:id', auth, postsMMCtrl.getOneMMPost);
router.put('/:id', auth, multer, postsMMCtrl.modifyMMPost);
router.delete('/:id', auth, postsMMCtrl.deleteMMPost);
router.post('/:id/likes', auth, postsMMCtrl.likeMMPost);
router.post('/search', auth, postsMMCtrl.searchMM);

module.exports = router;  