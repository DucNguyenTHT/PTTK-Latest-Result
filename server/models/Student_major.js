const mongoose = require('mongoose')

const StudentMajorSchema = mongoose.Schema({
    studentID :{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    majorID :{
        type:mongoose.Types.ObjectId,
        ref:"Major"
    },
    academicYear : {
        type:String
    },
    class :{
        type:String
    }
})


module.exports = mongoose.model('StudentMajor',StudentMajorSchema)