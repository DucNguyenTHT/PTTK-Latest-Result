const express = require('express');
const router  = express.Router();
const Topic   = require('../models/Topic');
const {
    uploadInfo
} = require('../middlewares/multer');
const { 
    GetAllTopic,
    addTopicByExcel,
    TeacherAddTopic,
    CurrentTeacherGetTopic,
    CurrentTeacherDeleteTopic,
    CurrentTeacherFixTopic,
    CurrentTopic,
    CurrentStudentGetTopic
} = require('../controllers/TopicController')

const advancedResult = require('../middlewares/advancedResult');
const {protect,authorize} = require('../middlewares/auth')
router.route('/')
    .get(advancedResult(Topic,''),GetAllTopic)
    .post(uploadInfo.single('file'),addTopicByExcel)

router.route('/adv')
    .get(protect,authorize('teacher'),CurrentTeacherGetTopic)
    .post(protect,authorize('teacher'),TeacherAddTopic)

router.route('/adv/:toppic')
    .get(protect,authorize('teacher'),CurrentTopic)
    .put(protect,authorize('teacher'),CurrentTeacherFixTopic)
    .delete(protect,authorize('teacher'),CurrentTeacherDeleteTopic)

router.route('/std')
    .get(protect,authorize('student'),CurrentStudentGetTopic)

module.exports = router