const express = require('express');
const router = express.Router();
const {
    login,
    getMe,
} = require('../controllers/authController');

const { protect } = require('../middlewares/auth');

router.route('/login')
    .post(login)

router.route('/me')
    .get(protect,getMe)

module.exports = router