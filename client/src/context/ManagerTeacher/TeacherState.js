import React, { useReducer } from 'react'
import TeacherContext from './TeacherContext'
import TeacherReducer from './TeacherReducer'

import axios from 'axios'
import {
    SET_TEACHER_PAGE,
    GET_TEACHER_PERPAGE
} from '../Type'
const TeacherState = (props) => {
    const initialState = {
        Teachers:[],
        Page:1,
        TotalPage:0,
    };
    const [state,dispatch] = useReducer(TeacherReducer,initialState);
    
    const GetTeacherDataPerPage = async (page) =>{
        const res = await axios.get(`http://localhost:5000/api/data/teacher?page=${page}`);
        dispatch({
            type:GET_TEACHER_PERPAGE,
            payload:res.data
        })
    };
    const SetTeacherPage = (value) => {
        dispatch({
            type:SET_TEACHER_PAGE,
            payload: value
        })
    }
    return (
        <TeacherContext.Provider
            value={{
                Teachers:state.Teachers,
                Page:state.Page,
                TotalPage:state.TotalPage,
                SetTeacherPage,
                GetTeacherDataPerPage
            }}
        >
            {props.children}
        </TeacherContext.Provider>
    )
}
export default TeacherState
