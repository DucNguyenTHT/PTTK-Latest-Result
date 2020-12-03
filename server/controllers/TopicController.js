const xlsx = require('xlsx');
const fs = require('fs')
const User = require("../models/User");
const Topic = require("../models/Topic")
const Major = require('../models/Major');
const Semester = require('../models/Semester')
const asyncHandler = require('../middlewares/async')
const errorResponse = require('../utils/errorResponse');
const StudentMajor = require('../models/Student_major')
//@desc             Add Major by excell
//@route            POST http://localhost:5000/api/major
//@access           private
exports.addTopicByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    let found = false;
    for(let i = 0;i<data.length;i++) {
        let test1  = await Major.findOne({MajorCode:data[i].MajorID});
        let test2  = await User.findOne({username:data[i].TeacherID});
        let test3  = await Semester.findOne({SemesterID:data[i].SemesterID});
        let test4  = await Topic.findOne({TopicCode:data[i].TopicCode});
        if(!test1 || !test2 || !test3 ||test4){
            found = true;
            break;
        }
        data[i].MajorID     = test1._id;
        data[i].TeacherID   = test2._id;
        data[i].SemesterID  = test3._id;
    }
    if(found){
        return next(new errorResponse('Dữ Xem lại Dữ liệu đi bạn',400));
    }
    Topic.insertMany(data);
    res.send(data);
})

//@desc             Get all Major 
//@route            GET http://localhost:5000/api/major
//@access           private
exports.GetAllTopic = asyncHandler(async(req,res,next)=>{
    res.status(200).json({
        data:res.advancedResult
    })
})

//@desc             Update topic 
//@route            PUT http://localhost:5000/api/topic/:id
//@access           private
exports.UpdateTopic = asyncHandler(async(req,res,next)=>{
    let Temp = await Topic.findById(req.params.id);
    if(!Temp){
        return next(new errorResponse('Không Tìm Thấy Đề Tài Này Nhé!',400));
    }

    Temp = await Topic.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })

    res.status(200).json({
        success: true,
        data   : Temp
    })
})


//@desc             Delete topic 
//@route            DELETE http://localhost:5000/api/topic/:id
//@access           private
exports.DeleteTopic = asyncHandler(async(req,res,next)=>{
    let Temp = await Topic.findById(req.params.id);
    if(!Temp){
        return next(new errorResponse('Không Tìm Thấy Đề Tài Này Nhé!',400));
    }
    Temp = await Topic.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        data   : []
    })
})

//@desc             add topic by teacher
//@route            POST http://localhost:5000/api/topic/adv/
//@access           private
exports.TeacherAddTopic = asyncHandler(async(req,res,next)=>{
    let topic = new Topic({
        TopicCode       : req.body.TopicCode,
        TopicName       : req.body.TopicName,
        TopicDescription: req.body.TopicDescription,
        SemesterID      : req.body.SemesterID,
        MajorID         : req.body.MajorID,
        TeacherID       : req.user.id
    })
    let data = await topic.save();
    const datatemp = await Topic.findById(data._id)
                            .populate('MajorID')
                            .populate('SemesterID')
    res.status(200).json({
        success:true,
        data:datatemp
    })
})

exports.CurrentTeacherGetTopic = asyncHandler(async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Topic.countDocuments({TeacherID:req.user._id});
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
    let data = await Topic.find({TeacherID:req.user._id})
                        .populate('MajorID')
                        .populate('SemesterID')
                        .skip((limit*page)-limit)
                        .limit(limit);
    res.status(200).json({
        success:true,
        pagination,
        total:Math.ceil(total/limit),
        count:data.length,
        pagination,
        data:data
    })
})

exports.CurrentTopic = asyncHandler(async(req,res,next)=>{
    const data = await Topic.findOne({_id:req.params.toppic});
    res.status(200).json({
        success:true,
        data:data
    })
})

exports.CurrentTeacherFixTopic = asyncHandler(async(req,res,next)=>{
    const data = await Topic.findByIdAndUpdate(req.params.toppic,req.body,{
        new:true,
        runValidators:true
    })
    .populate('SemesterID')
    .populate('MajorID')
    res.status(200).json({
        success:true,
        data:data
    })
})

exports.CurrentTeacherDeleteTopic = asyncHandler(async(req,res,next)=>{
    await Topic.findByIdAndRemove(req.params.toppic);
    res.status(200).json({
        success:true,
        data:[]
    })
})

exports.GetTopicByMajor = asyncHandler(async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Topic.countDocuments({MajorID:req.params.id});
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
    let data = await Topic.find({MajorID:req.params.id})
                        .populate('SemesterID')
                        .populate('TeacherID')
                        .skip((limit*page)-limit)
                        .limit(limit);
    res.status(200).json({
        success:true,
        pagination,
        total:Math.ceil(total/limit),
        count:data.length,
        pagination,
        data:data
    })
})

exports.CurrentStudentGetTopic = asyncHandler(async(req,res,next)=>{
    const currentStudentMajor = await StudentMajor.findOne({studentID:req.user.id});
    const topic = await Topic.find({MajorID:currentStudentMajor.majorID})
                                    .populate('SemesterID')
                                    .populate('TeacherID')
    res.status(200).json({
        success:true,
        data:topic
    })
})