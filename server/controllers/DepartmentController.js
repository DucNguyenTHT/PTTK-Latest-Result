const xlsx = require('xlsx')
const fs   = require('fs')
const Department = require('../models/Department')
const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const errorResponse = require('../utils/errorResponse');

//@desc             Add Department by excell
//@route            POST http://localhost:5000/api/department
//@access           private
exports.addDepartmentByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    let found = false;
    for(let i = 0;i<data.length;i++) {
        let test  = await Department.findOne({DepartmentCode:data[i].DepartmentCode});
        if(test){
            found = true;
            break;
        }
    }
    if(found){
        return next(new errorResponse('cái này thêm rồi đừng cố =)',400));
    }
    Department.insertMany(data);
    res.send(data);
})

//@desc             Get all Department data
//@route            GET http://localhost:5000/api/department
//@access           private
exports.getAllDepartment = asyncHandler( async(req,res,next) =>{
    res.status(200).json({
        success:true,
        data:res.advancedResult
    })
})

//@desc             add Department Leader
//@route            Put http://localhost:5000/api/department/:id/teacher/:teacherid
//@access           private
exports.addDepartmentLeader = asyncHandler( async(req,res,next) =>{
    let DepartmentTemp = await Department.findById(req.params.id);
    if(!DepartmentTemp){
        return next(new errorResponse('Không Tìm Thấy Khoa',400));
    }
    let Teacher = await User.findOne({_id:req.params.teacherid,role:"teacher"});
    if(!Teacher){
        return next(new errorResponse('Không Tìm Thấy Giáo Viên',400));
    }
    DepartmentTemp = await Department.findByIdAndUpdate(req.params.id,req.params.teacherid,{
        runValidators:true,
        new:true
    })
    res.status(200).json({
        success: true,
        data   : DepartmentTemp
    })
})

//@desc             add Department Leader
//@route            Put http://localhost:5000/api/department/:id
//@access           private
exports.fixDepartmentinfo = asyncHandler(async(req,res,next)=>{
    let DepartmentTemp = await Department.findById(req.params.id);
    if(!DepartmentTemp){
        return next(new errorResponse('Không Tìm Thấy Khoa',400));
    }
    DepartmentTemp = await Department.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })
    res.status(200).json({
        success:true,
        data: DepartmentTemp
    })
})

//@desc             Delete Department Leader
//@route            Delete http://localhost:5000/api/department/:id
//@access           private
exports.deleteDepartment = asyncHandler(async(req,res,next)=>{
    let DepartmentTemp = await Department.findById(req.params.id);
    if(!DepartmentTemp){
        return next(new errorResponse('Không Tìm Thấy Khoa',400));
    }
    await DepartmentTemp.remove();

    res.status(200).json({
        success:true,
    })
})