import React, { useReducer } from 'react'
import ManageStudentRegisterTopicContext from './ManageStudentRegisterTopicContext'
import ManageStudentRegisterTopicReducer from './ManageStudentRegisterTopicReducer'
import {
    GETACCESS,
    REMOVE_RST,
    GET_ALL
} from '../Type'
import SetAuthToken from '../../utils/SetAuthToken'
import Axios from 'axios'
const ManageStudentRegisterTopicState = (props) => {
    const initialState = {
        StudentRegiterTopics:[],
    }
    const [state,dispatch] = useReducer(ManageStudentRegisterTopicReducer,initialState);

    const StudentRegisterTopic = async (fromdata)=>{
        SetAuthToken(localStorage.token)
        await Axios.post('http://localhost:5000/api/registudent/register',fromdata);
    }

    const TeacherAcceptTopic = async (id)=>{
        SetAuthToken(localStorage.token)
        await Axios.put(`http://localhost:5000/api/registudent/ada/${id}`)
        dispatch({
            type: REMOVE_RST,
            payload:id
        })
    }

    const TeacherRejectTopic = async (id)=>{
        SetAuthToken(localStorage.token)
        await Axios.delete(`http://localhost:5000/api/registudent/adj/${id}`)
        dispatch({
            type: REMOVE_RST,
            payload:id
        })
    }
    
    const TeacherGetAccept  = async ()=>{
        SetAuthToken(localStorage.token)
        const data = await Axios.get(`http://localhost:5000/api/registudent/manage`);
        dispatch({
            type:GETACCESS,
            payload:data.data
        })
    }

    const ManagerGetAll  = async()=>{
        const data = await Axios.get(`http://localhost:5000/api/registudent/all`);
        dispatch({
            type:GET_ALL,
            payload:data.data
        })
    }
    return (
        <ManageStudentRegisterTopicContext.Provider
            value={{
                StudentRegiterTopics:state.StudentRegiterTopics,
                StudentRegisterTopic,
                TeacherAcceptTopic,
                TeacherRejectTopic,
                TeacherGetAccept,
                ManagerGetAll
            }}
        >
            {props.children}
        </ManageStudentRegisterTopicContext.Provider>
    )
}

export default ManageStudentRegisterTopicState
