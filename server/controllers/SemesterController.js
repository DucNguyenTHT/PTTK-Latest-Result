const xlsx = require('xlsx')
const fs = require('fs')
const asyncHandler = require('../middlewares/async')
const errorResponse = require('../utils/errorResponse');
const Semester      = require('../models/Semester')

exports.addSemesterByExcel = asyncHandler(async(req,res,next)=>{
    const workbook = xlsx.readFile(req.file.path);
    var sheet_name_list = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    fs.unlink(req.file.path,()=>{});
    await Semester.insertMany(data)
    res.status(200).json({
        success:true,
        data:data
    })
})

exports.getAllSemester = asyncHandler(async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Semester.countDocuments();
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
    const data = await Semester.find()
                                .skip((limit*page)-limit)
                                .limit(limit)
    res.status(200).send({
        success:true,
        total:Math.ceil(total/limit),
        count:data.length,
        pagination,
        data:data
    })
})

exports.getAllSemesterActive = asyncHandler(async(req,res,next)=>{
    let data = await Semester.find({isActive:1})
    res.status(200).send({
        success:true,
        data:data
    })
})