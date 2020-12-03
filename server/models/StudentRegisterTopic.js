const mongoose = require('mongoose');

const StudentRegisterTopicSchema = mongoose.Schema({
    StudentID:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        unique:true
    },
    TopicID:{
        type:mongoose.Types.ObjectId,
        ref:"Topic"
    },
    TeacherID:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    Status:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('StudentRegisterTopic',StudentRegisterTopicSchema)