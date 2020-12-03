import React, { useEffect,useContext } from 'react'
import TeacherContext from '../../../context/ManagerTeacher/TeacherContext'
import './ManageTeacher.css'
import './FlexTable.css'
import Pagination from '@material-ui/lab/Pagination';

const ManagerTeacher = () => {
    const ManagerTeacher = useContext(TeacherContext);
    const {SetTeacherPage,Teachers,TotalPage,Page,GetTeacherDataPerPage} = ManagerTeacher
    useEffect(()=>{
        GetTeacherDataPerPage("1");
        // eslint-disable-next-line
    },[])
    const ChangePage=(event,value)=>{
        GetTeacherDataPerPage(value);
        SetTeacherPage(value);
    }
    return (
        <div className="ManageTeacher">
            <div className="flex-title">
                <h1>Quản Lý Giáo Viên</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-10 ">
                        Avatar
                    </div>
                    <div className="hcell w-10 ">
                        Mã Giáo Viên
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
                    {Teachers.length>0 && Teachers.map(Teacher =>(
                        <div className="row w-100" key={Teacher._id}>
                            <div className="cell w-10">
                                <img src={`http://localhost:5000/upload/img/${Teacher.image}`} alt="Avatar"/>
                            </div>
                            <div className="cell w-10">
                                {Teacher.username}                                
                            </div>
                            <div className="cell w-25">
                                {Teacher.name}
                            </div>
                            <div className="cell w-10">
                                {
                                    Teacher.dateofbirth.split('T')[0].split('-')[2]+'-'+
                                    Teacher.dateofbirth.split('T')[0].split('-')[1]+'-'+
                                    Teacher.dateofbirth.split('T')[0].split('-')[0]
                                }
                            </div>
                            <div className="cell w-10">
                                {Teacher.phonenumber}
                            </div>
                            <div className="cell w-35">
                                {Teacher.address}
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
                    {TotalPage>0 && <Pagination count={TotalPage} page={Page} onChange={ChangePage} variant="outlined" color="secondary" style={{marginTop:"15px"}}/>}
                </div>
            </div>
        </div>
    )
}


export default ManagerTeacher
