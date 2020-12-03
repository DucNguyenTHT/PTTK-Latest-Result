const express = require('express');
const router  = express.Router();
const {
    StudentRegisterTopic,
    TeacherAcceptTopic,
    TeacherRejectTopic,
    TeacherGetRegister,
    ManagerRegister
} = require('../controllers/StudentRegisterTopicController')
const {
    protect,authorize
} = require('../middlewares/auth')

router.route('/register')
    .post(protect,authorize('student'),StudentRegisterTopic)

router.route('/ada/:id')
    .put(protect,authorize('teacher'),TeacherAcceptTopic)

router.route('/adj/:id')
    .delete(protect,authorize('teacher'),TeacherRejectTopic)

router.route('/manage')
    .get(protect,authorize('teacher'),TeacherGetRegister)

router.route('/all')
    .get(ManagerRegister)
module.exports = router