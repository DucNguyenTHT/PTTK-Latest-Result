import {
    CURRENT_TEACHER_GET_TOPIC,
    TEACHER_ADD_TOPIC,
    CURRENT_TOPIC_PAGE,
    CURRENT_TEACHER_FIX_TOPIC,
    CURRENT_TEACHER_DELETE_TOPIC,
    STUDENT_GET_TOPIC,
} from '../Type'

export default (state,action)=>{
    switch(action.type){
        case CURRENT_TEACHER_GET_TOPIC:
            return {
                ...state,
                Topics:action.payload.data,
                TotalPage:action.payload.total
            }
        case TEACHER_ADD_TOPIC:
            return {
                ...state,
                Topics:[action.payload.data,...state.Topics]
            }
        case CURRENT_TEACHER_FIX_TOPIC:
            return {
                ...state,
                Topics:state.Topics.map(topic => topic._id === action.payload.data._id ? action.payload.data : topic)
            }
        case CURRENT_TOPIC_PAGE:
            return {
                ...state,
                Page:action.payload
            }
        case CURRENT_TEACHER_DELETE_TOPIC:
            return {
                ...state,
                Topics: state.Topics.filter(
                    topic => topic._id !== action.payload
                ),
            }
        case STUDENT_GET_TOPIC:
            return {
                ...state,
                Topics:action.payload.data
            }
        default:
            return{
                state
            }
    }
}