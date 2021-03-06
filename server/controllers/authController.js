const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User         = require('../models/User')

//@desc      login user
//@Route     Get /api/v1/auth/login
//@access    Public
exports.login = asyncHandler(async(req,res,next)=>{
    const {username,password} = req.body;
    
    //validate email & password
    if(!username || !password) {
        return next(new ErrorResponse('please provide an email and password',500));
    }

    const user  = await User.findOne({username}).select('+password');

    if(!user){
        return next(new ErrorResponse('Invalid credentials',401));
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials',401));
    }

    sendTokenResponse(user,200,res);
});


//@desc      Getcurrent user
//@Route     Get /api/v1/auth/me
//@access    private

exports.getMe = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        data:user
    })
})

//get Token from model create cookie and send response
const sendTokenResponse = (user, statusCode,res) =>{
    //create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    }
    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie('token',token,options)
        .json({
            success:true,
            token
        })
}