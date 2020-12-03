const multer = require('multer')

const uploadUserInfo = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,process.cwd()+'/public/upload/info')
    },
    filename:(req,file,cb)=>{
        let explore = file.originalname.split('.');
        let ext     = explore[explore.length-1];
        cb(null,"Excel-"+Date.now()+'.'+ext)
    }
});

const storageUserPicture = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,process.cwd()+'/public/upload/img');
    },
    filename:(req,file,cb)=>{
        let explore = file.originalname.split('.');
        let ext = explore[explore.length-1];
        cb(null,'User-'+req.params.id+'.'+ext);
    }
});

const StorageInfo = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,process.cwd()+'/public/upload/info')
    },
    filename:(req,file,cb)=>{
        let explore = file.originalname.split('.');
        let ext     = explore[explore.length-1];
        cb(null,"Excel-"+Date.now()+'.'+ext)
    }
});

exports.uploadUserInfo = multer({storage:uploadUserInfo});
exports.uploadUserPicture = multer({storage:storageUserPicture});
exports.uploadInfo = multer({storage:StorageInfo})
