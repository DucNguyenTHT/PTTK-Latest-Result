const xlsx = require('xlsx')
const fs   = require('fs')
const TeacherDepartment = require('../models/Teacher_department');
const User              = require('../models/User');
const Department        = require('../models/Department')
const asyncHandler = require('../middlewares/async')
const errorResponse = require('../utils/errorResponse');

exports.addTeacherDepartmentByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    let found = false;
    for(let i = 0;i<data.length;i++) {
        let test1  = await User.findOne({username:data[i].TeacherID});
        let test2  = await Department.findOne({DepartmentCode:data[i].DepartmentID});
        if(!test1 || !test2){
            found = true;
            break;
        }
        data[i].TeacherID = test1._id;
        data[i].DepartmentID = test2._id;
    }
    if(found){
        return next(new errorResponse('Dữ Xem lại Dữ liệu đi bạn',400));
    }
    TeacherDepartment.insertMany(data);
    res.send(data);
})

exports.getAllTeacherData = asyncHandler(async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await TeacherDepartment.countDocuments({});
    const pagination = {};
    if(endIndex<total){
        pagination.next = {
            page:page+1,
            limit
        }
    }
    if(startIndex > 0){
        pagination.prev = {
            page:page-1,
            limit
        }
    }
    let data = await TeacherDepartment.find({})
                    .populate('TeacherID')
                    .populate('DepartmentID')
                    .skip((limit*page)-limit)
                    .limit(limit);
    res.status(200).send({
        success:true,
        total:Math.ceil(total/limit),
        count:data.length,
        pagination,
        data:data
    })
})