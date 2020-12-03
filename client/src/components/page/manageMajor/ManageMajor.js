import React, { useEffect,useContext } from 'react'
import './ManageMajor.css'
import './FlexTable.css'
import Pagination from '@material-ui/lab/Pagination';
import MajorContext from '../../../context/ManagerMajor/MajorContext'
const ManagerMajor = () => {
    const ManagerMajor = useContext(MajorContext);
    const {GetMajorPerPage,SetMajorPage,TotalPage,Page,Majors} = ManagerMajor
    useEffect(()=>{
        GetMajorPerPage("1");
        // eslint-disable-next-line
    },[])
    const ChangePage=(event,value)=>{
        GetMajorPerPage(value);
        SetMajorPage(value);
    }
    return (
        <div className="ManageMajor">
            <div className="flex-title">
                <h1>Quản Lý Ngành</h1>
            </div>
            <div className="flexbox-table">
                <div className="flexbox-head w-100">
                    <div className="hcell w-10 ">
                        Mã Ngành
                    </div>
                    <div className="hcell w-25 ">
                        Tên Ngành
                    </div>
                    <div className="hcell w-25 ">
                        Tên Nước Ngoài
                    </div>
                    <div className="hcell w-15 ">
                        Ngày mở ngành
                    </div>
                    <div className="hcell w-25 ">
                        Thuộc khoa
                    </div>
                </div>
            <div className="flexbox-body w-100">
                {Majors && Majors.length>0 && Majors.map(Major =>(
                    <div className="row w-100" key={Major._id}>
                        <div className="cell w-10">
                            {Major.MajorCode}  
                        </div>
                        <div className="cell w-25">
                            {Major.MajorLocalName}                                
                        </div>
                        <div className="cell w-25">
                            {Major.MajorGlobalName}
                        </div>
                        <div className="cell w-15 ">
                            {
                                Major.DateOpen.split('T')[0].split('-')[2]+'-'+
                                Major.DateOpen.split('T')[0].split('-')[1]+'-'+
                                Major.DateOpen.split('T')[0].split('-')[0]
                            }
                        </div>
                        <div className="cell w-25">
                            {Major.DepartmentID.DepartmentLocalName}
                        </div>
                    </div>
                ))}
            </div>
            </div>
            <div className="prow w-100">
                <div className="w-25"></div>
                <div className="w-25"></div>
                <div className="w-23"></div>
                <div className="w-25">
                    {TotalPage>0 && <Pagination count={TotalPage} page={Page} onChange={ChangePage} variant="outlined" color="secondary" style={{marginTop:"15px"}}/>}
                </div>
            </div>
        </div>
    )
}


export default ManagerMajor
