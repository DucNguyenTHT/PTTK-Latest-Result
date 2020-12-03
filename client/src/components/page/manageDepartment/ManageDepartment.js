import React, { useEffect,useContext } from 'react'
import DepartmentContext from '../../../context/ManagerDepartment/DepartmentContext'
import './ManageDepartment.css'
import './FlexTable.css'
import Pagination from '@material-ui/lab/Pagination';

const ManagerDepartment = () => {
    const ManagerDepartment = useContext(DepartmentContext);
    const {SetDepartmentPage,GetDepartmentPerPage,TotalPage,Page,Departments} = ManagerDepartment
    useEffect(()=>{
        GetDepartmentPerPage("1");
        // eslint-disable-next-line
    },[])
    const ChangePage=(event,value)=>{
        GetDepartmentPerPage(value);
        SetDepartmentPage(value);
    }
    return (
        <div className="ManageDepartment">
            <div className="flex-title">
                <h1>Quản Lý Khoa</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-25 ">
                        Mã Khoa
                    </div>
                    <div className="hcell w-25 ">
                        Tên Khoa
                    </div>
                    <div className="hcell w-25 ">
                        Tên Nước Ngoài
                    </div>
                    <div className="hcell w-25 ">
                        Trưởng Khoa
                    </div>
                </div>
                <div className="flexbox-body w-100">
                    {Departments.length>0 && Departments.map(Department =>(
                        <div className="row w-100" key={Department._id}>
                            <div className="cell w-25">
                                {Department.DepartmentCode}  
                            </div>
                            <div className="cell w-25">
                                {Department.DepartmentLocalName}
                            </div>
                            <div className="cell w-25">
                                {Department.DepartmentGlobalName}         
                            </div>
                            <div className="cell w-25">
                                {Department.LeaderOfDepartment}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="prow w-100">
                <div className="w-25"></div>
                <div className="w-25"></div>
                <div className="w-25"></div>
                <div className="w-25">
                    {TotalPage>0 && <Pagination count={TotalPage} page={Page} onChange={ChangePage} variant="outlined" color="secondary" style={{marginTop:"15px"}}/>}
                </div>
            </div>
        </div>
    )
}


export default ManagerDepartment
