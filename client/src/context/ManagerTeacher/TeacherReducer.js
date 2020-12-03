import {
    GET_TEACHER_PERPAGE,
    SET_TEACHER_PAGE
} from '../Type.js'

export default (state,action)=>{
    switch(action.type){
        case GET_TEACHER_PERPAGE:
            return {
                ...state,
                Teachers:action.payload.data,
                TotalPage:action.payload.total
            }
        case SET_TEACHER_PAGE:
            return {
                ...state,
                Page:action.payload
            }
        default:
            return state
    }
}