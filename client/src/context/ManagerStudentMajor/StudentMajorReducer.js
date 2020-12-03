import {
    SET_STUDENT_MAJOR_PAGE,
    GET_STUDENT_MAJOR_PERPAGE,
} from '../Type.js'

export default (state,action)=>{
    switch (action.type){
        case GET_STUDENT_MAJOR_PERPAGE:
            return {
                ...state,
                StudentMajor:action.payload.data,
                TotalPage:action.payload.total
            }
        case SET_STUDENT_MAJOR_PAGE:
            return {
                ...state,
                Page:action.payload
            }
        default:
            return {
                state
            }
    }
}