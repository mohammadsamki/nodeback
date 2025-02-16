const express  = require('express');
const router = express.Router();
const {register,login,refreshToken,home} = require('../controllers/authUserController');
const AuthMiddleware = require('../routers/asuthMiddleware');

router.post('/register', register);
router.post('/login',login);
router.post('/refreshToken',refreshToken);

router.get('/home',AuthMiddleware,home)

module.exports = router;