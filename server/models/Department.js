const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    DepartmentCode:{
        type:String,
        required:[true,'Please enter department code'],
        unique:true,
    },
    DepartmentLocalName:{
        type:String
    },
    DepartmentGlobalName:{
        type:String
    },
    LeaderOfDepartment:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

DepartmentSchema.pre('remove', async function(next){
    console.log(`Major being removed from Department ${this._id}`)
    await this.model('Major').deleteMany({DepartmentID: this._id});
    next();
})


module.exports = mongoose.model('Department',DepartmentSchema)