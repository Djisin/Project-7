const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//getPostsCtrl = require('../controllers/postsG')
postsCtrl = require('../controllers/posts');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId && !req.session.token) {
        res.redirect('/login')
    } else {
        next()
    }
}


router.get('/',/* redirectLogin,*/auth, postsCtrl.getAllPosts);
router.get('/:id',auth, postsCtrl.getOnePost)
router.put('/:id',auth, postsCtrl.modifyPost)
router.delete('/:id',auth, postsCtrl.deletePost)
router.post('/:id/likes',auth, postsCtrl.likesPost)
router.post('/createPost', auth, postsCtrl.createPost);

module.exports = router;