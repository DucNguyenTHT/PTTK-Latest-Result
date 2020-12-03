const xlsx = require('xlsx');
const fs = require('fs')
const Major = require("../models/Major")
const Department = require('../models/Department');
const moment = require('moment');
const { getJsDateFromExcel } = require('excel-date-to-js');
const asyncHandler = require('../middlewares/async')
const errorResponse = require('../utils/errorResponse');
const Teacher_Department = require('../models/Teacher_department')
//@desc             Add Major by excell
//@route            POST http://localhost:5000/api/major
//@access           private
exports.addMajorByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    let found = false;
    for(let i = 0;i<data.length;i++) {
        let test  = await Department.findOne({DepartmentCode:data[i].DepartmentID});
        if(!test){
            found = true;
            break;
        }
        data[i].DateOpen = moment(getJsDateFromExcel(data[i].DateOpen),'DD/MM/YYYY').format();
        data[i].DepartmentID = test._id;
    }
    if(found){
        return next(new errorResponse('Dữ Xem lại Dữ liệu đi bạn',400));
    }
    for(let i = 0;i<data.length;i++) {
        let test  = await Major.findOne({MajorCode:data[i].MajorCode});;
        if(test){
            found = true;
            break;
        }
    }
    if(found){
        return next(new errorResponse('cái này thêm rồi đừng cố =)',400));
    }
    Major.insertMany(data);
    res.send(data);
})

//@desc             Get all Major 
//@route            GET http://localhost:5000/api/major
//@access           private
exports.GetMajorPerPage = asyncHandler(async(req,res,next)=>{
    res.status(200).json({
        data:res.advancedResult
    })
})

exports.GetAllMajor = asyncHandler(async(req,res,next)=>{
    const data =  await Major.find({})
                            .select('MajorLocalName')
    res.status(200).json({
        success:true,
        data:data
    })
})

exports.GetMajorByDepartMent = asyncHandler(async(req,res,next)=>{
    const department = await Teacher_Department.findOne({TeacherID:req.user.id});
    const data       = await Major.find({DepartmentID:department.DepartmentID})
                            .select('MajorLocalName')
    res.status(200).json({
        success:true,
        data:data
    })
})