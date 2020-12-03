const xlsx = require('xlsx');
const fs   = require('fs');
const Topic = require('../models/Topic');
const User  = require('../models/User');
const StudentRegisterTopic = require('../models/StudentRegisterTopic');
const asyncHandler = require('../middlewares/async');

exports.addStudentRegisterTopicByExcel = asyncHandler( async(req,res,next) =>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    let found = false;
    for(let i = 0;i<data.length;i++) {
        let test2  = await User.findOne({username:data[i].StudentID});
        let test3  = await Topic.findOne({TopicCode:data[i].TopicID});
        if(!test2 || !test3){
            found = true;
            break;
        }
        data[i].StudentID   = test2._id;
        data[i].TopicID = test3._id;
    }
    if(found){
        return next(new errorResponse('Dữ Xem lại Dữ liệu đi bạn',400));
    }
    StudentRegisterTopic.insertMany(data);
    res.send(data);
})

exports.StudentRegisterTopic = asyncHandler( async(req,res,next) =>{
    let topic = await Topic.findById(req.body.TopicID);

    const data = new StudentRegisterTopic({
        StudentID:req.user.id,
        TopicID:req.body.TopicID,
        TeacherID:topic.TeacherID,
        Status:0
    })
    data.save()
    res.status(200).json({
        success:true,
    })
})

exports.TeacherAcceptTopic  = asyncHandler( async(req,res,next) =>{
    const data = await StudentRegisterTopic.findByIdAndUpdate(req.params.id,{Status:1},{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        success:true,
        data:data
    })
})

exports.TeacherRejectTopic  = asyncHandler( async(req,res,next) =>{
    await StudentRegisterTopic.findByIdAndRemove(req.params.id)
    res.status(200).json({
        success:true,
        data:[]
    })
})


exports.TeacherGetRegister =  asyncHandler( async(req,res,next) =>{
    const data = await StudentRegisterTopic.find({TeacherID:req.user.id,Status:0})
                                            .populate('StudentID')
                                            .populate('TopicID')
    res.status(200).json({
        success:true,
        data:data
    })
})

exports.ManagerRegister =  asyncHandler( async(req,res,next) =>{
    const data = await StudentRegisterTopic.find({})
                                .populate('StudentID')
                                .populate('TopicID')
                                .populate('TeacherID')
    res.status(200).json({
        success:true,
        data:data
    })
})