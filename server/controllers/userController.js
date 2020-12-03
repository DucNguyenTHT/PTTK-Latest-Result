const moment = require('moment');
const fs     = require('fs')
const xlsx = require('xlsx')
const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const {getJsDateFromExcel} = require('excel-date-to-js');
const errorResponse = require('../utils/errorResponse');
const bcrypt   = require('bcryptjs')

//@desc             Add Student by excell
//@route            POST http://localhost:5000/api/v1/data/student
//@access           private
exports.addStudentByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    req.body.role = 'student'
    data.map((temp) => {
        temp.dateofbirth = moment(getJsDateFromExcel(temp.dateofbirth),'DD/MM/YYYY').format();
        temp.role = req.body.role 
    })
    let found = false;
    const salt = await bcrypt.genSalt(10);
    for(let i = 0;i<data.length;i++) {
        let test  = await User.findOne({username:data[i].username});
        data[i].password =  await bcrypt.hash(data[i].password.toString(),salt)
        if(test){
            found = true;
            break;
        }
    }
    if(found){
        return next(new errorResponse('cái này thêm rồi đừng cố =)',400));
    }
    User.insertMany(data);
    res.send(data);
})

//@desc             Get All Student
//@route            GET http://localhost:5000/api/v1/data/student
//@access           private
exports.getAllStudent = asyncHandler(async(req,res,next) =>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await User.countDocuments({role:"student"});
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
    let data = await User.find({role:"student"})
                    .skip((limit*page)-limit)
                    .limit(limit);
    res.status(200).json({
        success:true,
        total:Math.ceil(total/limit),
        count: data.length,
        pagination,
        data:data
    })
})

//@desc             Get a Student data
//@route            GET http://localhost:5000/api/v1/data/student/:id
//@access           private
exports.getStudent = asyncHandler(async(req,res,next)=>{
    const data = await User.findById(req.params.id);
    if(!data){
        return next(new errorResponse(`Not Found student with id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        data:data
    });
})

//@desc             Update student data
//@route            PUT http://localhost:5000/api/v1/data/student/:id
//@access           private
exports.updateStudent = asyncHandler(async(req,res,next)=>{
    let user = await User.findById(req.params.id);
    if(!user){
        return next(new errorResponse(`Not Found student with id: ${req.params.id}`))
    }

    user = await User.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })

    res.status(200).json({
        success:true,
        data:user
    })
})

//@desc             Delete Student data
//@route            DELETE http://localhost:5000/api/v1/data/student/:id
//@access           private
exports.deleteUser = asyncHandler(async(req,res,next)=>{
    let user = await User.findById(req.params.id);
    if(!user){
        return next(new errorResponse(`Not Found student with id: ${req.params.id}`))
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        data:[]
    })
})

//@desc             update Student picture
//@route            PUT http://localhost:5000/api/v1/data/user/:id
//@access           private
exports.uploadPicture = asyncHandler(async(req,res,next)=>{
    let file = req.file;
    if(!file){
        return next(new errorResponse(`didn't have any input file`));
    }
    let user = await User.findById(req.params.id);
    if(!user){
        return next(new errorResponse(`Not Found user with id: ${req.params.id}`))
    }
    user = await User.findByIdAndUpdate(req.params.id,{
        image:file.filename
    },{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        data:user
    });
})


//@desc             Add Teacher by excell
//@route            POST http://localhost:5000/api/v1/data/teacher
//@access           private
exports.addTeacherByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    req.body.role = 'teacher'
    data.map((temp) => {
        temp.dateofbirth = moment(getJsDateFromExcel(temp.dateofbirth),'DD/MM/YYYY').format();
        temp.role = req.body.role 
    })
    let found = false;
    const salt = await bcrypt.genSalt(10);
    for(let i = 0;i<data.length;i++) {
        data[i].password =  await bcrypt.hash(data[i].password.toString(),salt)
        let test  = await User.findOne({username:data[i].username});
        if(test){
            found = true;
            break;
        }
    }
    if(found){
        return next(new errorResponse('cái này thêm rồi đừng cố =)',400));
    }
    User.insertMany(data);
    res.send(data);
})

exports.getAllTeacher = asyncHandler(async(req,res,next) =>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await User.countDocuments({role:"teacher"});
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
    let data = await User.find({role:"teacher"})
                    .skip((limit*page)-limit)
                    .limit(limit)
    res.status(200).json({
        success:true,
        total:Math.ceil(total/limit),
        count: data.length,
        pagination,
        data:data
    })
})

//@desc             Add manager by excell
//@route            POST http://localhost:5000/api/v1/data/manager
//@access           private
exports.addManagerByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    req.body.role = 'manager'
    data.map((temp) => {
        temp.dateofbirth = moment(getJsDateFromExcel(temp.dateofbirth),'DD/MM/YYYY').format();
        temp.role = req.body.role 
    })
    let found = false;
    const salt = await bcrypt.genSalt(10);
    for(let i = 0;i<data.length;i++) {
        data[i].password =  await bcrypt.hash(data[i].password.toString(),salt)
        let test  = await User.findOne({username:data[i].username});
        if(test){
            found = true;
            break;
        }
    }
    if(found){
        return next(new errorResponse('cái này thêm rồi đừng cố =)',400));
    }
    User.insertMany(data);
    res.send(data);
})

exports.getAllManager = asyncHandler(async(req,res,next) =>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await User.countDocuments({role:"manager"});
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
    let data = await User.find({role:"manager"})
                    .skip((limit*page)-limit)
                    .limit(limit)
    res.status(200).json({
        success:true,
        total:Math.ceil(total/limit),
        count: data.length,
        pagination,
        data:data
    })
})