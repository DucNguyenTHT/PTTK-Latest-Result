const express = require('express');
const router = express.Router();
const advancedResult = require('../middlewares/advancedResult');

const {
    addMajorByExcel, 
    GetMajorPerPage,
    GetAllMajor,
    GetMajorByDepartMent
} = require ('../controllers/MajorController')

const {
    uploadInfo
} = require ('../middlewares/multer');
const Major = require('../models/Major');
const {protect,authorize} = require('../middlewares/auth')
router.route('/')
    .post(uploadInfo.single('file'),addMajorByExcel)
    .get(advancedResult(Major,'DepartmentID'),GetMajorPerPage)

router.route('/all')
    .get(GetAllMajor)

router.route('/adv')
    .get(protect,GetMajorByDepartMent)
    
module.exports = router