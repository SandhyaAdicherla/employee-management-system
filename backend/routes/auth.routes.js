const express = require('express');

const router = express.Router();

const authController =
    require('../controllers/auth.controller');

const auth =
    require('../middleware/auth');
const demoProtection = require('../middleware/demoProtection');

router.post('/register', authController.register);

router.post('/login', authController.login);
router.put("/change-password",auth,demoProtection,authController.changePassword);

router.get('/profile', auth, authController.profile);

module.exports = router;