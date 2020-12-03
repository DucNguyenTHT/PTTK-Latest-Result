import React,{useContext,useEffect,useState}from 'react'
import './FlexTable.css'
import './StudentRegisterTopic.css'
import TopicContext from '../../../context/ManageTopic/ManageTopicContext'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import ManageStudentRegisterTopicContext from '../../../context/ManageStudentRegisterTopic/ManageStudentRegisterTopicContext'
const StudentRegisterTopic = () => {
    const topicContext = useContext(TopicContext)
    const StudentRegisterContext= useContext(ManageStudentRegisterTopicContext)
    const {StudentGetTopic,Topics} = topicContext
    const {StudentRegisterTopic}= StudentRegisterContext
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [info, setinfo] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [topicId, settopicId] = useState('');
    const [info1, setinfo1] = useState('');
    const [info2, setinfo2] = useState('');
    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    useEffect(()=>{
        StudentGetTopic();
        // eslint-disable-next-line
    },[])
    return (
    <div className="StudentRegisterTopic">
            <div className="flex-title">
                <h1>Đăng ký đề tài</h1>
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
                        Kì học 
                    </div>
                    <div className="hcell w-20 ">
                        Giáo Viên Hướng dẫn
                    </div>
                    <div className="hcell w-30 ">
                        Action
                    </div>
                </div>
                <div className="flexbox-body w-100">
                    {Topics && Topics.length>0 && Topics.map( temp =>(
                        <div className="row w-100" key={temp._id}>
                            <div className="cell w-10 ">
                                {temp.TopicCode}
                            </div>
                            <div className="cell w-20 ">
                                {temp.TopicName}
                            </div>
                            <div className="cell w-20 ">
                                {temp.SemesterID.Semester}
                            </div>
                            <div className="cell w-20 ">
                                {temp.TeacherID.name}
                            </div>
                            <div className="cell w-30 ">
                                <Button color='primary'
                                    onClick={(e)=>{
                                        setinfo(temp.TopicDescription)
                                        handleClickOpen();
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i> Mô Tả
                                </Button>
                                <Button color='primary'
                                    onClick={(e)=>{
                                        settopicId(temp._id)
                                        setinfo1(temp.TopicName)
                                        setinfo2(temp.TeacherID.name)
                                        handleClickOpen1()
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i> Đăng Ký
                                </Button>  
                            </div>
                        </div>
                        ))}
                </div>
            </div>
            <div className="prow w-100">
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
                <DialogTitle id="alert-dialog-title">Xác nhận đăng ký đề tài</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h2>Bạn có định đăng ký đề tài {info1} của giáo viên {info2} Không? </h2>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{
                    StudentRegisterTopic({
                        TopicID:topicId
                    })
                    settopicId('');
                    setinfo1('')
                    setinfo2('')
                    handleClose1()
                }} color="primary">
                    Xác nhận 
                </Button>
                <Button onClick={handleClose1} color="primary">
                    Thoát
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StudentRegisterTopic
