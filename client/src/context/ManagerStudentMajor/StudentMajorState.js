import React, { useReducer } from 'react'
import StudentMajorContext from './StudentMajorContext'
import StudentMajorReducer from './StudentMajorReducer'

import axios from 'axios'
import {
    SET_STUDENT_MAJOR_PAGE,
    GET_STUDENT_MAJOR_PERPAGE,
} from '../Type'
const StudentMajorState = (props) => {
    const initialState = {
        StudentMajor:[],
        Page:1,
        TotalPage:0,
    };
    
    const [state,dispatch] = useReducer(StudentMajorReducer,initialState);
    
    const GetStudentMajorPerPage = async (id,page) =>{
        const res = await axios.get(`http://localhost:5000/api/studentmajor/${id}?page=${page}`);
        console.log(res)
        dispatch({
            type:GET_STUDENT_MAJOR_PERPAGE,
            payload:res.data
        })
    };
    const SetStudentMajorPage = (value) => {
        dispatch({
            type:SET_STUDENT_MAJOR_PAGE,
            payload: value
        })
    }
    return (
        <StudentMajorContext.Provider
            value={{
                StudentMajor:state.StudentMajor,
                Page:state.Page,
                TotalPage:state.TotalPage,
                SetStudentMajorPage,
                GetStudentMajorPerPage
            }}
        >
            {props.children}
        </StudentMajorContext.Provider>
    )
}
export default StudentMajorState
