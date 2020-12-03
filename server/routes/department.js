const express = require('express');
const router = express.Router();
const {
    uploadInfo
} = require('../middlewares/multer')
const { 
    addDepartmentByExcel, 
    getAllDepartment, 
    fixDepartmentinfo,
    deleteDepartment,
    addDepartmentLeader
} = require('../controllers/DepartmentController');
const Department = require('../models/Department');
const advancedresult = require('../middlewares/advancedResult');

router.route('/')
    .get(advancedresult(Department,'User'),getAllDepartment)
    .post(uploadInfo.single('file'),addDepartmentByExcel)

router.route("/:id/teacher/:teacherid")
    .put(addDepartmentLeader)

router.route('/:id')
    .put(fixDepartmentinfo)
    .delete(deleteDepartment)

module.exports = router