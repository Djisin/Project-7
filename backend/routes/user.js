const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/loggedIn', UserCtrl.index);
router.post('/signup', UserCtrl.signup);
router.post('/login', UserCtrl.login);
router.post('/logout', UserCtrl.logout);

router.get('/user/profile', auth, UserCtrl.profile);
router.put('/user/profile/:id', auth, multer, UserCtrl.editProfile);
router.delete('/user/profile/:id', auth, UserCtrl.deleteProfile);

router.post('/user/profile/hkReport', auth, UserCtrl.hackReport);

module.exports = router; 