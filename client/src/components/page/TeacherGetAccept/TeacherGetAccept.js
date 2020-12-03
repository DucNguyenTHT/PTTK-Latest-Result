import React,{useContext,useEffect,useState}from 'react'
import './FlexTable.css'
import './TeacherGetAccept.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import ManageStudentRegisterTopicContext from '../../../context/ManageStudentRegisterTopic/ManageStudentRegisterTopicContext'
const StudentRegisterTopic = () => {
    const StudentRegisterContext= useContext(ManageStudentRegisterTopicContext)
    const {StudentRegiterTopics,
        TeacherAcceptTopic,
        TeacherRejectTopic,
        TeacherGetAccept
    }= StudentRegisterContext
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [topicId, settopicId] = useState('');
    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    useEffect(()=>{
        TeacherGetAccept();
        // eslint-disable-next-line
    },[])
    return (
    <div className="TeacherGetAccept">
            <div className="flex-title">
                <h1>Duyệt Đăng Ký Đề Tài</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-10 ">
                        Mã Học Sinh
                    </div>
                    <div className="hcell w-20 ">
                        Họ Và Tên 
                    </div>
                    <div className="hcell w-20 ">
                        Mã Đề Tài
                    </div>
                    <div className="hcell w-30 ">
                        Tên Đề Tài
                    </div>
                    <div className="hcell w-20 ">
                        Action
                    </div>
                </div>
                <div className="flexbox-body w-100">
                    {StudentRegiterTopics && StudentRegiterTopics.length>0 && StudentRegiterTopics.map( temp =>(
                        <div className="row w-100" key={temp._id}>
                            <div className="cell w-10 ">
                                {temp.StudentID.username}
                            </div>
                            <div className="cell w-20 ">
                                {temp.StudentID.name}
                            </div>
                            <div className="cell w-20 ">
                                {temp.TopicID.TopicCode}
                            </div>
                            <div className="cell w-30 ">
                                {temp.TopicID.TopicName}
                            </div>
                            <div className="cell w-20 ">
                                <Button color='primary'
                                    onClick={(e)=>{
                                        settopicId(temp._id)
                                        handleClickOpen();
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i> Duyệt Đăng ký
                                </Button>
                                <Button color='primary'
                                    onClick={(e)=>{
                                        settopicId(temp._id)
                                        handleClickOpen1()
                                    }}
                                >
                                    <i className="fa fa-info-circle" aria-hidden="true"></i>Từ Chối
                                </Button>  
                            </div>
                        </div>
                        ))}
                </div>
            </div>
            <div className="prow w-100">
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h2>Xác Nhận Cho Sinh Viên Đăng ký đề tài này? </h2>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{
                    TeacherAcceptTopic(topicId)
                    handleClose()
                }} color="primary">
                    Xác Nhận
                </Button>
                <Button onClick={handleClose} color="primary">
                    Thoát
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open1} onClose={handleClose1}>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h2>Không Duyệt Cho Sinh Viên Đăng ký đề tài này? </h2>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{
                    TeacherRejectTopic(topicId)
                    handleClose1();
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
