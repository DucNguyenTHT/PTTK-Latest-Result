import React, { useReducer } from 'react'
import DepartmentContext from './DepartmentContext'
import DepartmentReducer from './DepartmentReducer'

import axios from 'axios'
import {
    GET_DEPARTMENT_PERPAGE,
    SET_DEPARTMENT_PAGE,
} from '../Type'

const DepartmentState = (props) => {
    const initialState = {
        Departments:[],
        Page:1,
        TotalPage:0,
    };
    const [state,dispatch] = useReducer(DepartmentReducer,initialState);
    
    const GetDepartmentPerPage = async (page) =>{
        const res = await axios.get(`http://localhost:5000/api/department?page=${page}`);
        console.log(res.data.data)
        dispatch({
            type:GET_DEPARTMENT_PERPAGE,
            payload:res.data.data
        })
    };
    const SetDepartmentPage = (value) => {
        dispatch({
            type:SET_DEPARTMENT_PAGE,
            payload: value
        })
    }
    return (
        <DepartmentContext.Provider
            value={{
                Departments:state.Departments,
                Page:state.Page,
                TotalPage:state.TotalPage,
                GetDepartmentPerPage,
                SetDepartmentPage
            }}
        >
            {props.children}
        </DepartmentContext.Provider>
    )
}
export default DepartmentState
