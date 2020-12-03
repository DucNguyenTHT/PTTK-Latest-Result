const mongoose = require('mongoose')

const TopicSchema = mongoose.Schema({
    TopicCode : {
        type:String,
        unique:true
    },
    TopicName : {
        type:String
    },
    TopicDescription: {
        type:String
    },
    SemesterID : {
        type:mongoose.Types.ObjectId,
        ref:"Semester"
    },
    MajorID : {
        type:mongoose.Types.ObjectId,
        ref:"Major"
    },
    TeacherID : {
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('Topic',TopicSchema)