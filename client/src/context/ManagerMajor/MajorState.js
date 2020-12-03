import React, { useReducer } from 'react'
import MajorContext from './MajorContext'
import MajorReducer from './MajorReducer'

import axios from 'axios'
import {
    SET_MAJOR_PAGE,
    GET_MAJOR_PERPAGE,
    GET_ALL_MAJORDATA,
    GET_ALL_MAJOR_BY_DEPARTMENT,
    LOAD_SEMESTER
} from '../Type'

const MajorState = (props) => {
    const initialState = {
        AllMarjor:[],
        Majors:[],
        Page:1,
        TotalPage:0,
        semester:[]
    };
    const [state,dispatch] = useReducer(MajorReducer,initialState);
    
    const GetMajorPerPage = async (page) =>{
        const res = await axios.get(`http://localhost:5000/api/major?page=${page}`);
        console.log(res.data.data)
        dispatch({
            type:GET_MAJOR_PERPAGE,
            payload:res.data.data
        })
    };
    const GetAllMajor = async () =>{
        const res = await axios.get(`http://localhost:5000/api/major/all`);
        dispatch({
            type:GET_ALL_MAJORDATA,
            payload:res.data
        })
    }

    const GetMajorbyTeacher = async () =>{
        const res = await axios.get(`http://localhost:5000/api/major/adv`);
        dispatch({
            type:GET_ALL_MAJOR_BY_DEPARTMENT,
            payload:res.data
        })
    }

    const SetMajorPage = (value) => {
        dispatch({
            type:SET_MAJOR_PAGE,
            payload: value
        })
    }

    const GetSemester = async ()=>{
        const res = await axios.get('http://localhost:5000/api/semester')
        dispatch({
            type:LOAD_SEMESTER,
            payload:res.data
        })
    }
    return (
        <MajorContext.Provider
            value={{
                AllMarjor:state.AllMarjor,
                Majors:state.Majors,
                Page:state.Page,
                TotalPage:state.TotalPage,
                semester:state.semester,
                GetMajorPerPage,
                SetMajorPage,
                GetAllMajor,
                GetMajorbyTeacher,
                GetSemester
            }}
        >
            {props.children}
        </MajorContext.Provider>
    )
}
export default MajorState
