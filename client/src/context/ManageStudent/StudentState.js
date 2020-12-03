import React,{useReducer} from 'react';
import StudentContext from './StudentContext';
import StudentReducer  from './StudentReducer';
import axios from 'axios'
import {
    SET_STUDENT_PAGE,
    GET_STUDENT_PERPAGE
} from '../Type'
const StudentState = (props) => {
    const initialState = {
        Students:[],
        Student:{},
        Page:1,
        TotalPage:0,
    };
    const [state,dispatch] = useReducer(StudentReducer,initialState);
    
    const GetStudentDataPerPage = async (page) =>{
        const res = await axios.get(`http://localhost:5000/api/data/student?page=${page}`);
        dispatch({
            type:GET_STUDENT_PERPAGE,
            payload:res.data
        })
    };
    const SetPage = (value) => {
        dispatch({
            type:SET_STUDENT_PAGE,
            payload: value
        })
    }
    return (
        <StudentContext.Provider
            value={{
                Students:state.Students,
                Student:state.Student,
                Page:state.page,
                TotalPage:state.TotalPage,
                SetPage,
                GetStudentDataPerPage
            }}
        >
            {props.children}
        </StudentContext.Provider>
    )
}
export default StudentState
