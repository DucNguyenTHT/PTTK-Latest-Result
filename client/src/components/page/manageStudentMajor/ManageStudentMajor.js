import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import React, { useContext, useEffect, useState } from 'react'
import MajorContext from '../../../context/ManagerMajor/MajorContext'
import StudentMajorContext from '../../../context/ManagerStudentMajor/StudentMajorContext'
import './FlexTable.css'
import './ManageStudentMajor.css'
const ManageStudentMajor = () => {
    const [Major,setMajor] = useState('');
    const majorContext = useContext(MajorContext);
    const studentMajorContext = useContext(StudentMajorContext)
    const {AllMarjor,GetAllMajor} = majorContext;
    const {GetStudentMajorPerPage,SetStudentMajorPage,StudentMajor,Page,TotalPage} = studentMajorContext;

    useEffect(()=>{
        GetAllMajor();
    // eslint-disable-next-line 
    },[])
    const ChangeValue = (e) =>{
        SetStudentMajorPage(1)
        if(e.target.value !== "-1" ){
            setMajor(e.target.value)
            GetStudentMajorPerPage(e.target.value,Page)
        }
    }
    const ChangePage = (event,value) =>{
        SetStudentMajorPage(value)
        GetStudentMajorPerPage(Major,value)
    }
    return (
        <div style={{width:"100%"}} className='ManageStudentMajor'>
            <FormControl style={{width:'300px',marginLeft:"20px"}}>
                <InputLabel>Chọn Ngành</InputLabel>
                <Select
                    onChange={ChangeValue}
                    value = {Major}
                    autoWidth
                >
                    <MenuItem selected value="-1">
                        <em>Chọn Ngành</em>
                    </MenuItem>
                    {AllMarjor.length>0 && AllMarjor.map((major,index) =>(
                        <MenuItem value={major._id} key={major._id}>
                            <em>{major.MajorLocalName}</em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {
                StudentMajor.length>0 && 
                    <div className="ManageStudent">
                        <div className="flexbox-table">
                            <div className="flexbox-head w-100">
                                <div className="hcell w-10 ">
                                    avatar
                                </div>
                                <div className="hcell w-15 ">
                                    Mã Sinh Viên
                                </div>
                                <div className="hcell w-25 ">
                                    Tên Sinh Viên
                                </div>
                                <div className="hcell w-25 ">
                                    Khóa
                                </div>
                                <div className="hcell w-25 ">
                                    Lớp
                                </div>
                            </div>
                            <div className="flexbox-body w-100">
                                {StudentMajor.length > 0 && StudentMajor.map(Student =>(
                                    <div className="row w-100" key={Student._id}>
                                        <div className="cell w-10">
                                            <img src={`http://localhost:5000/upload/img/${Student.studentID.image}`} alt="avatar"/>                                
                                        </div>
                                        <div className="cell w-15">
                                            {Student.studentID.username}                                
                                        </div>
                                        <div className="cell w-25">
                                            {Student.studentID.name}
                                        </div>
                                        <div className="cell w-25">
                                            {Student.academicYear}
                                        </div>
                                        <div className="cell w-25">
                                            {Student.class}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="prow w-100">
                            <div className="w-25"></div>
                            <div className="w-25"></div>
                            <div className="w-15"></div>
                            <div className="w-35">
                                {
                                TotalPage>1 
                                && 
                                    <Pagination 
                                        count={TotalPage} 
                                        page={Page} 
                                        onChange={ChangePage} 
                                        variant="outlined" 
                                        color="secondary" 
                                        style={{marginTop:"15px"}}
                                    />
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ManageStudentMajor
