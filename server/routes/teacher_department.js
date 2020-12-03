const express = require('express');
const { 
    addTeacherDepartmentByExcel, 
    getAllTeacherData,
    
} = require('../controllers/TeacherDepartmentController');
const {
    uploadInfo
} = require('../middlewares/multer');

const router  = express.Router();

router.route('/')
    .get(getAllTeacherData)
    .post(uploadInfo.single('file'),addTeacherDepartmentByExcel)

module.exports = router