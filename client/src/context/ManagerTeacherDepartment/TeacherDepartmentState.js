import React, { useReducer } from 'react'
import TeacherDepartmentContext from './TeacherDepartmentContext'
import TeacherDepartmentReducer from './TeacherDeparmentReducer'

import axios from 'axios'
import {
    SET_TEACHER_DEPARTMENT_PAGE,
    GET_TEACHER_DEPARTMENT_PERPAGE
} from '../Type'
const TeacherDepartmentState = (props) => {
    const initialState = {
        TeacherDepartment:[],
        page:1,
        TotalPage:0,
    };
    const [state,dispatch] = useReducer(TeacherDepartmentReducer,initialState);
    
    const GetTeacherDepartmentPerpage = async (page) =>{
        const res = await axios.get(`http://localhost:5000/api/teacherdepartment?page=${page}`);
        console.log(res.data)
        dispatch({
            type:GET_TEACHER_DEPARTMENT_PERPAGE,
            payload:res.data
        })
    };
    const SetTeacherDepartmentPage = (value) => {
        dispatch({
            type:SET_TEACHER_DEPARTMENT_PAGE,
            payload: value
        })
    }
    return (
        <TeacherDepartmentContext.Provider
            value={{
                TeacherDepartment:state.TeacherDepartment,
                page:state.page,
                TotalPage:state.TotalPage,
                SetTeacherDepartmentPage,
                GetTeacherDepartmentPerpage
            }}
        >
            {props.children}
        </TeacherDepartmentContext.Provider>
    )
}
export default TeacherDepartmentState
