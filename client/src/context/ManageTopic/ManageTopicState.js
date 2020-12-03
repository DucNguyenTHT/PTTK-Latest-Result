import React, { useReducer } from 'react'
import ManageTopicContext from './ManageTopicContext'
import ManageTopicReducer from './ManageTopicReducer'
import axios from 'axios'
import {
    CURRENT_TEACHER_GET_TOPIC,
    TEACHER_ADD_TOPIC,
    CURRENT_TOPIC_PAGE,
    CURRENT_TEACHER_FIX_TOPIC,
    CURRENT_TEACHER_DELETE_TOPIC,
    STUDENT_GET_TOPIC
} from '../Type'
import SetAuthToken from '../../utils/SetAuthToken'
const ManageTopicState = (props) => {
    const initialState = {
        Topics:[],
        Topic :{},
        TotalPage:0,
        Page:0,
    }
    const [state,dispatch] = useReducer(ManageTopicReducer,initialState);
    
    const CurentTeacherGetTopic = async (page) =>{
        SetAuthToken(localStorage.token)
        const res = await axios.get(`http://localhost:5000/api/topic/adv?page=${page}`);
        dispatch({
            type:CURRENT_TEACHER_GET_TOPIC,
            payload: res.data
        })
    }

    const CurentTeacherAddTopic = async (dataform) =>{
        SetAuthToken(localStorage.token)
        let res = await axios.post('http://localhost:5000/api/topic/adv',dataform);
        dispatch({
            type:TEACHER_ADD_TOPIC,
            payload: res.data
        })
    }


    const CurrentTeacherFixTopic = async(dataform)=>{
        SetAuthToken(localStorage.token);
        let res = await axios.put(`http://localhost:5000/api/topic/adv/${dataform.id}`,dataform);
        dispatch({
            type:CURRENT_TEACHER_FIX_TOPIC,
            payload: res.data
        })
    }
    
    const CurrenTeacherDeleteTopic = async(id)=>{
        SetAuthToken(localStorage.token)
        await axios.delete(`http://localhost:5000/api/topic/adv/${id}`);
        dispatch({
            type: CURRENT_TEACHER_DELETE_TOPIC,
            payload: id
        })
    }

    const SetToppicPage = (value)=>{
        dispatch({
            type:CURRENT_TOPIC_PAGE,
            payload: value
        })
    }

    const StudentGetTopic = async ()=>{
        SetAuthToken(localStorage.token)
        const res = await axios.get('http://localhost:5000/api/topic/std')
        dispatch({
            type:STUDENT_GET_TOPIC,
            payload: res.data
        })
    }
    return (
        <ManageTopicContext.Provider
            value={{
                Topics:state.Topics,
                Topic:state.Topic,
                TotalPage:state.TotalPage,
                Page:state.Page,
                semester:state.semester,
                CurentTeacherGetTopic,
                CurentTeacherAddTopic,
                CurrentTeacherFixTopic,
                CurrenTeacherDeleteTopic,
                SetToppicPage,
                StudentGetTopic,
            }}
        >
            {props.children}
        </ManageTopicContext.Provider>
    )
}

export default ManageTopicState
