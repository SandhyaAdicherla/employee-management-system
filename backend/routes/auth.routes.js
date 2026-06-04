const express = require('express');

const router = express.Router();

const authController =
    require('../controllers/auth.controller');

const auth =
    require('../middleware/auth');

router.post('/register', authController.register);

router.post('/login', authController.login);
router.put("/change-password",auth,authController.changePassword);

router.get('/profile', auth, authController.profile);

module.exports = router;