const express = require('express');
const { 
    addStudentByExcel, 
    getAllStudent, 
    getStudent,
    updateStudent,
    deleteUser,
    uploadPicture,
    addManagerByExcel,
    addTeacherByExcel,
    getAllTeacher,
    getAllManager
} = require('../controllers/userController');
const {
    uploadUserInfo,
    uploadUserPicture
} = require('../middlewares/multer');
const router  = express.Router();

//Crud data in database student route
router.route('/student')
    .get(getAllStudent)
    .post(uploadUserInfo.single('file'),addStudentByExcel)

router.route('/student/:id/info')
    .get(getStudent)
    .put(updateStudent)
    
//Cru data in database teacher route
router.route('/teacher')
    .get(getAllTeacher)
    .post(uploadUserInfo.single('file'),addTeacherByExcel)
//Cru data in database manager route
router.route('/manager')
    .get(getAllManager)
    .post(uploadUserInfo.single('file'),addManagerByExcel)

//uploaduserpicture
router.route('/user/:id/upload')
    .put(uploadUserPicture.single('file'),uploadPicture)

router.route('/user/:id')
    .delete(deleteUser)

module.exports = router