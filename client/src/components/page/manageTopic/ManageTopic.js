import React,{useContext,useEffect,useState} from 'react'
import './FlexTable.css'
import './ManageTopic.css'
import ManageTopicContext from '../../../context/ManageTopic/ManageTopicContext'
import Pagination from '@material-ui/lab/Pagination';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, NativeSelect, TextField } from '@material-ui/core';
import MajorContext from '../../../context/ManagerMajor/MajorContext'
const ManageTopic = () => {
    const toppicContext = useContext(ManageTopicContext);
    const {
        Topics,
        TotalPage,
        Page,
        CurentTeacherGetTopic,
        CurrentTeacherFixTopic,
        CurrenTeacherDeleteTopic,
        SetToppicPage,
        CurentTeacherAddTopic
    } = toppicContext
    const majorContext = useContext(MajorContext);
    const {
        GetMajorbyTeacher,AllMarjor,semester,GetSemester
    } = majorContext
    useEffect(() => {
        CurentTeacherGetTopic('1');
        GetMajorbyTeacher();
        GetSemester();
        // eslint-disable-next-line
    }, [])
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [info, setinfo] = useState('');
    const [Major,setMajor]= useState('');
    const [semes,setSemester] = useState('');
    const [TPcode,setTPcode] = useState('');
    const [TPname,setTPname] = useState('');
    const [TPdes,setTPdes] = useState('');
    const [Fixid,setFixid] = useState('');
    const handleChangeMajor = (e)=>{
        console.log(e.target.value)
        setMajor(e.target.value)
    }
    const handleChangeSemester = (e)=>{
        setSemester(e.target.value)
    }
    const ChangePage = (event,value)=>{
        CurentTeacherGetTopic(value)
        SetToppicPage(value);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    
    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    
    const handleClose2 = () => {
        setOpen2(false);
    };
    return (
        <div className='ManageTopic'>
            <div className="flex-title">
                <h1 className='w-30'>Đề tài Của Giáo Viên</h1>
                <Button 
                    style={{background:"black",color:'white'}}
                    onClick={()=>{
                        handleClickOpen2();
                    }}
                >Add Topic</Button>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-10 ">
                        Mã Đề Tài
                    </div>
                    <div className="hcell w-20 ">
                        Tên Đề Tài
                    </div>
                    <div className="hcell w-20 ">
                        Thuộc ngành
                    </div>
                    <div className="hcell w-25 ">
                        Học kỳ
                    </div>
                    <div className="hcell w-30 ">
                        Action
                    </div>
                </div>
            <div className="flexbox-body w-100">
                {
                    Topics&&Topics.length>0 &&Topics.map((temp)=>(
                        <div className="row w-100" key={temp._id}>
                            <div className="cell w-10">
                                {temp.TopicCode}
                            </div>
                            <div className="cell w-20">
                                {temp.TopicName}
                            </div>
                            <div className="cell w-20">
                                {temp.MajorID.MajorLocalName}
                            </div>
                            <div className="cell w-25">
                                {temp.SemesterID.Semester}
                            </div>
                            <div className="cell w-30">
                                <Button color='primary'
                                    onClick={(e)=>{
                                        setinfo(temp.TopicDescription)
                                        handleClickOpen();
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i> info
                                </Button>
                                <Button color='primary'
                                    onClick={(e)=>{
                                        CurrenTeacherDeleteTopic(temp._id)
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i> Delete
                                </Button>  
                                <Button color='primary'
                                    onClick={(e)=>{
                                        setFixid(temp._id);
                                        setSemester(temp.SemesterID._id)
                                        setTPname(temp.TopicName)
                                        setTPcode(temp.TopicCode)
                                        setMajor(temp.MajorID._id)
                                        setTPdes(temp.TopicDescription)
                                        handleClickOpen1();
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i> update
                                </Button>  
                            </div>
                        </div>
                    ))
                }
            </div>
            </div>
            <div className="prow w-100">
                <div className="w-25"></div>
                <div className="w-25"></div>
                <div className="w-20"></div>
                <div className="w-25">
                    {TotalPage > 1 && <Pagination count={TotalPage} page={Page} onChange={ChangePage} variant="outlined" color="secondary" style={{marginTop:"15px"}}/>}
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">Thông Tin CHi tiết Đề tài</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {info}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Thoát
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open1} onClose={handleClose1}>
                <DialogTitle id="alert-dialog-title">Sửa Thông Tin Đề Tài</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TextField label="Mã Đề Tài" value={TPcode} onChange={(e)=>setTPcode(e.target.value)} style={{width:'100%'}} />
                    <TextField label="Tên Đề Tài" value={TPname} onChange={(e)=>setTPname(e.target.value)}  style={{width:'100%'}} />
                    <FormControl style={{width:'100%'}}>
                        <InputLabel htmlFor="age-native-helper">Ngành Học</InputLabel>
                        <NativeSelect
                            value={Major}
                            onChange={handleChangeMajor}
                        >
                            <option aria-label="None" value="" />
                            {AllMarjor && AllMarjor.map(temp=>(
                                <option value={temp._id} key={temp._id}>
                                        {temp.MajorLocalName}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <FormControl style={{width:'100%'}}>
                        <InputLabel htmlFor="age-native-helper">Năm Học</InputLabel>
                        <NativeSelect
                            value={semes}
                            onChange={handleChangeSemester}
                        >
                            <option aria-label="None" value="" />
                            {semester && semester.map(temp=>(
                                <option value={temp._id} key={temp._id}>
                                        {temp.Semester}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <TextField value={TPdes} onChange={(e)=>setTPdes(e.target.value)} label="Mô Tả" style={{width:'100%'}} />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{
                    CurrentTeacherFixTopic({
                        id:Fixid,
                        MajorID:Major,
                        TopicName:TPname,
                        TopicCode:TPcode,
                        TopicDescription:TPdes,
                        SemesterID:semes,
                    })
                    setFixid('');
                    setSemester('')
                    setTPname('')
                    setTPcode('')
                    setMajor('')
                    setTPdes('')
                    setOpen1(false);
                }} color="primary">
                    Lưu thay đổi
                </Button>
                <Button onClick={handleClose1} color="primary">
                    Thoát
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open2} onClose={handleClose2}>
                <DialogTitle id="alert-dialog-title">Sửa Thông Tin Đề Tài</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TextField label="Mã Đề Tài" value={TPcode} onChange={(e)=>setTPcode(e.target.value)} style={{width:'100%'}} />
                    <TextField label="Tên Đề Tài" value={TPname} onChange={(e)=>setTPname(e.target.value)}  style={{width:'100%'}} />
                    <FormControl style={{width:'100%'}}>
                        <InputLabel htmlFor="age-native-helper">Ngành Học</InputLabel>
                        <NativeSelect
                            value={Major}
                            onChange={handleChangeMajor}
                        >
                            <option aria-label="None" value="" />
                            {AllMarjor && AllMarjor.map(temp=>(
                                <option value={temp._id} key={temp._id}>
                                        {temp.MajorLocalName}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <FormControl style={{width:'100%'}}>
                        <InputLabel htmlFor="age-native-helper">Năm Học</InputLabel>
                        <NativeSelect
                            value={semes}
                            onChange={handleChangeSemester}
                        >
                            <option aria-label="None" value="" />
                            {semester && semester.map(temp=>(
                                <option value={temp._id} key={temp._id}>
                                        {temp.Semester}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <TextField value={TPdes} onChange={(e)=>setTPdes(e.target.value)} label="Mô Tả" style={{width:'100%'}} />
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{
                    CurentTeacherAddTopic({
                        id:Fixid,
                        MajorID:Major,
                        TopicName:TPname,
                        TopicCode:TPcode,
                        TopicDescription:TPdes,
                        SemesterID:semes,
                    })
                    setFixid('');
                    setSemester('')
                    setTPname('')
                    setTPcode('')
                    setMajor('')
                    setTPdes('')
                    handleClose2()
                }} color="primary">
                    Thêm Đề Tài
                </Button>
                <Button onClick={handleClose2} color="primary">
                    Thoát
                </Button>
                </DialogActions>
            </Dialog>
        </div>
        
    )
}

export default ManageTopic