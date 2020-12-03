const mongoose = require('mongoose');

const MajorSchema = mongoose.Schema({
    MajorCode:{
        type:String,
        unique:true
    },
    MajorLocalName:{
        type:String
    },
    MajorGlobalName:{
        type:String
    },
    DateOpen:{
        type:Date,
    },
    DepartmentID:{
        type: mongoose.Types.ObjectId,
        ref: "Department"
    }
})

module.exports = mongoose.model('Major',MajorSchema);