import React, { useEffect,useContext } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import TeacherDepartmentContext from '../../../context/ManagerTeacherDepartment/TeacherDepartmentContext'
import './ManageTeacherDepartment.css'
import './FlexTable.css'

const ManagerTeacherDeparment = () => {
    const ManagerTeacherDepartment = useContext(TeacherDepartmentContext);
    const {SetTeacherDepartmentPage,GetTeacherDepartmentPerpage,TeacherDepartment,TotalPage,Page} = ManagerTeacherDepartment
    useEffect(()=>{
        GetTeacherDepartmentPerpage("1");
        // eslint-disable-next-line
    },[])
    
    const ChangePage=(event,value)=>{
        GetTeacherDepartmentPerpage(value);
        SetTeacherDepartmentPage(value);
    }
    return (
        <div className="ManageMajor">
            <div className="flex-title">
                <h1>Giáo Viên theo khoa</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-25 ">
                        Avatar
                    </div>
                    <div className="hcell w-25 ">
                        Mã Giáo Viên
                    </div>
                    <div className="hcell w-25 ">
                        Tên Giáo Viên
                    </div>
                    <div className="hcell w-25 ">
                        Thuộc khoa
                    </div>
                </div>
            <div className="flexbox-body w-100">
                {TeacherDepartment && TeacherDepartment.length>0 && TeacherDepartment.map(temp =>(
                    <div className="row w-100" key={temp._id}>
                        <div className="cell w-25">
                            <img src={`http://localhost:5000/upload/img/${temp.TeacherID.image}`} alt="Avatar"/>
                        </div>
                        <div className="cell w-25">
                            {temp.TeacherID.username}                                
                        </div>
                        <div className="cell w-25">
                            {temp.TeacherID.name}
                        </div>
                        <div className="cell w-25">
                            {temp.DepartmentID.DepartmentLocalName}
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className="prow w-100">
                <div className="w-25"></div>
                <div className="w-25"></div>
                <div className="w-10"></div>
                <div className="w-35">
                    {TotalPage>0 && <Pagination count={TotalPage} page={Page} onChange={ChangePage} variant="outlined" color="secondary" style={{marginTop:"15px"}}/>}
                </div>
            </div>
        </div>
    )
}


export default ManagerTeacherDeparment
