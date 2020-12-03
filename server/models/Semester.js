const mongoose = require('mongoose');

const SemesterSchema = mongoose.Schema({
    SemesterID:{
        type:String,
        unique:true
    },
    Semester : {
        type:String,
        unique:true
    },
    isActive :{
        type:Number,
    }
})

module.exports = mongoose.model('Semester',SemesterSchema)