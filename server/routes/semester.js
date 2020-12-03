const express = require('express');
const router  = express.Router();
const {
    uploadInfo
}  = require('../middlewares/multer');
const { 
    addSemesterByExcel,
    getAllSemesterActive,
    getAllSemester
} = require('../controllers/SemesterController')

router.route('/')
    .post(uploadInfo.single('file'),addSemesterByExcel)
    .get(getAllSemesterActive)

router.route('/all')
    .get(getAllSemester)

module.exports = router


