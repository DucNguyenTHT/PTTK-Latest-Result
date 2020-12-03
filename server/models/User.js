const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name :{
        type:String,
        require:[true,'Please add a name']
    },
    username:{
        type:String,
        require:[true,'Please enter user name'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'Please enter password'],
        select:false
    },
    address: {
        type:String
    },
    phonenumber: {
        type:String,
        match : [
            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
            'Please add a valid phone number'
        ]
    },
    dateofbirth:{
        type: Date,
    },
    email: {
        type:String,
    },
    role:{
        type: String,
        require: true,
        enum : ['student','teacher','manager'],
    },
    image: {
        type: String,
        default:'no_img.jpg'
    }
})

userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User',userSchema)