const express = require('express');
const { 
    addStudentMajorByExcel,
    getDataPerPage,
    GetStudentByMajor
} = require('../controllers/MajorStudentController');
const {
    uploadInfo
} = require('../middlewares/multer');

const router  = express.Router();

router.route('/')
    .get(getDataPerPage)
    .post(uploadInfo.single('file'),addStudentMajorByExcel)

router.route('/:id')
    .get(GetStudentByMajor)
module.exports = router