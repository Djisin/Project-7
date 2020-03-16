const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');

const redirectHome = (req, res, next) => {
    if (req.session.userId && req.session.token) {
        res.redirect('127.0.0.1:5500/frontend/posts.html')
    } else {
        next()
    }
}

const redirectLogin = (req, res, next) => {
    if (!req.session.userId && !req.session.token) {
        res.redirect('/frontend/index.html')
    } else {
        next()
    }
}

router.post('/loggedIn', UserCtrl.index)
router.post('/signup', UserCtrl.signup);
router.post('/login', UserCtrl.login);
router.post('/logout', UserCtrl.logout);

module.exports = router; 