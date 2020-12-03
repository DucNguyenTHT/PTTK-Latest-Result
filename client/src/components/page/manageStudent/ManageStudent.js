import React, { useEffect,useContext } from 'react'
import StudentContext from '../../../context/ManageStudent/StudentContext'
import './ManageStudent.css'
import './FlexTable.css'
import Pagination from '@material-ui/lab/Pagination';
const ManageStudent = () => {
    const manageStudent = useContext(StudentContext);
    const {GetStudentDataPerPage,Students,TotalPage,page,SetPage} = manageStudent
    useEffect(()=>{
        GetStudentDataPerPage("1");
        // eslint-disable-next-line
    },[])
    const ChangePage=(event,value)=>{
        GetStudentDataPerPage(value);
        SetPage(value);
    }
    return (
        <div className="ManageStudent">
            <div className="flex-title">
                <h1>Quản Lý Sinh Viên</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-10 ">
                        Avatar
                    </div>
                    <div className="hcell w-10 ">
                        Mã Sinh Viên
                    </div>
                    <div className="hcell w-25 ">
                        Họ Và Tên
                    </div>
                    <div className="hcell w-10 ">
                        Ngày Sinh
                    </div>
                    <div className="hcell w-10 ">
                        Số Điện Thoại
                    </div>
                    <div className="hcell w-35 ">
                        Địa Chỉ Nhà
                    </div>
                </div>
                <div className="flexbox-body w-100">
                    {Students.length>0 && Students.map(Student =>(
                        <div className="row w-100" key={Student._id}>
                            <div className="cell w-10">
                                <img src={`http://localhost:5000/upload/img/${Student.image}`} alt=""/>
                            </div>
                            <div className="cell w-10">
                                {Student.username}                                
                            </div>
                            <div className="cell w-25">
                                {Student.name}
                            </div>
                            <div className="cell w-10">
                                {
                                    Student.dateofbirth.split('T')[0].split('-')[2]+'-'+
                                    Student.dateofbirth.split('T')[0].split('-')[1]+'-'+
                                    Student.dateofbirth.split('T')[0].split('-')[0]
                                }
                            </div>
                            <div className="cell w-10">
                                {Student.phonenumber}
                            </div>
                            <div className="cell w-35">
                                {Student.address}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="prow w-100">
                <div className="w-10"></div>
                <div className="w-10"></div>
                <div className="w-25"></div>
                <div className="w-10"></div>
                <div className="w-10"></div>
                <div className="w-35">
                    {TotalPage>0 && <Pagination count={TotalPage} page={page} onChange={ChangePage} variant="outlined" color="secondary" style={{marginTop:"15px"}}/>}
                </div>
            </div>
        </div>
    )
}


export default ManageStudent
