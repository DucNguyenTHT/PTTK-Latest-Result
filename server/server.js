const express   = require('express');
const colors    = require('colors');
const path      = require('path');
const morgan    = require('morgan');
const cors      = require('cors');
const bodypaser = require('body-parser');
const app       = express();
const dotenv    = require('dotenv');

app.use(cors());
//file config import
const ConnectDB = require('./config/ConnectDB');
const errorHandler = require('./middlewares/error');

//config process env
dotenv.config({path:"./config/default.env"});

//connect to database func
ConnectDB();

//middleware data
app.use(bodypaser.json({}));
app.use(bodypaser.urlencoded({extended:true}));
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.static(path.join(__dirname+'/public')))

//import file
const UserRoute              = require('./routes/user');
const DepartmentRoute        = require('./routes/department');
const MajorRoute             = require('./routes/major');
const StudentMajorRoute      = require('./routes/student_major');
const TeacherDepartmentRoute = require('./routes/teacher_department');
const authRoute              = require('./routes/auth');
const TopicRoute             = require('./routes/topic');
const SemesterRoute          = require('./routes/semester')
const StdRegistRoute         = require('./routes/studentregistertopic');
//middleware route
app.use('/api/data',UserRoute);
app.use('/api/department',DepartmentRoute);
app.use('/api/major',MajorRoute);
app.use('/api/studentmajor',StudentMajorRoute);
app.use('/api/teacherdepartment',TeacherDepartmentRoute);
app.use('/api/auth',authRoute);
app.use('/api/topic',TopicRoute);
app.use('/api/semester',SemesterRoute);
app.use('/api/registudent',StdRegistRoute);

//middleware before save 
app.use(errorHandler)
const PORT    = process.env.PORT || 5000;

const server = app.listen(PORT , ()=>{
    console.log(`app is running on port : http://localhost:${PORT}`.yellow)
});

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error:{\n ${err.message}\n}`.red);
    server.close(()=>{
        process.exit(1);
    })
})