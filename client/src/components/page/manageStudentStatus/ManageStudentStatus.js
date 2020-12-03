import React, { useEffect,useContext } from 'react'
import './ManageStudentStatus.css'
import './FlexTable.css'
import ManageStudentRegisterTopicContext from '../../../context/ManageStudentRegisterTopic/ManageStudentRegisterTopicContext'
const ManagerStudentStatus = () => {
    const ManageStatus = useContext (ManageStudentRegisterTopicContext)
    const {ManagerGetAll,StudentRegiterTopics} = ManageStatus
    useEffect(()=>{
        ManagerGetAll();
        // eslint-disable-next-line
    },[])
    return (
        <div className="ManageStatus">
            <div className="flex-title">
                <h1>Trạng thái các sinh viên đăng ký</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-10 ">
                        Mã Đề Tài
                    </div>
                    <div className="hcell w-20 ">
                        Tên Đề Tài
                    </div>
                    <div className="hcell w-10 ">
                        Mã Học Viên
                    </div>
                    <div className="hcell w-25 ">
                        Tên Học Viên
                    </div>
                    <div className="hcell w-25 ">
                        Tên Giáo viên hướng dẫn
                    </div>
                    <div className="hcell w-10 ">
                        Trạng Thái
                    </div>
                </div>
            <div className="flexbox-body w-100">
                {StudentRegiterTopics && StudentRegiterTopics.length>0 && StudentRegiterTopics.map(temp=>(
                    <div className="row w-100" >
                        <div className="cell w-10 ">
                            {temp.TopicID.TopicCode}
                        </div>
                        <div className="cell w-20 ">
                            {temp.TopicID.TopicName}
                        </div>
                        <div className="cell w-10 ">
                            {temp.StudentID.username}
                        </div>
                        <div className="cell w-25 ">
                            {temp.StudentID.name}
                        </div>
                        <div className="cell w-25 ">
                            {temp.TeacherID.name}
                        </div>
                        <div className="cell w-10 ">
                            {temp.Status === 1 ? 'Accepted' : 'pendding'}
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className="prow w-100">
            </div>
        </div>
    )
}


export default ManagerStudentStatus
