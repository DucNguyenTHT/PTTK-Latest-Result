const mongoose = require('mongoose')

const TeacherDepartmentSChema = mongoose.Schema({
    TeacherID:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    DepartmentID :{
        type:mongoose.Types.ObjectId,
        ref:"Department"
    }
})

module.exports = mongoose.model('TeacherDepartment',TeacherDepartmentSChema)