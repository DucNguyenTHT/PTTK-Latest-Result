const xlsx = require('xlsx')
const fs   = require('fs')
const User = require('../models/User')
const Major = require('../models/Major')
const StudentMajor = require('../models/Student_major')
const asyncHandler = require('../middlewares/async')
const errorResponse = require('../utils/errorResponse');

//@desc             Add studentmajor by excell
//@route            POST http://localhost:5000/api/studentmajor
//@access           private
exports.addStudentMajorByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    let found = false;
    for(let i = 0;i<data.length;i++) {
        let test  = await User.findOne({username:data[i].studentID});
        let test1  = await Major.findOne({MajorCode:data[i].majorID});
        if(!test || ! test1){
            found = true;
            break;
        }
        data[i].studentID = test._id;
        data[i].majorID   = test1._id;
    }
    if(found){
        return next(new errorResponse('Dữ Xem lại Dữ liệu đi bạn',400));
    }
    StudentMajor.insertMany(data);
    res.send(data);
})


exports.getDataPerPage = asyncHandler(async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await StudentMajor.countDocuments({});
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
    let data = await StudentMajor.find({})
                    .populate('studentID')
                    .populate('majorID')
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

exports.GetStudentByMajor = asyncHandler(async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await StudentMajor.countDocuments({majorID:req.params.id});
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
    const data = await StudentMajor.find({majorID:req.params.id})
                                .skip((limit*page)-limit)
                                .limit(limit)
                                .select('studentID academicYear class')
                                .populate('studentID')
    res.status(200).send({
        success:true,
        total:Math.ceil(total/limit),
        count:data.length,
        pagination,
        data:data
    })
})

exports.CurrentStudentGetMajor = asyncHandler(async(req,res,next)=>{
    const data = await StudentMajor.find({studentID:req.user.id})
                            .select('majorID');
    res.status(200).send({
        success:true,
        data:data
    })
})
