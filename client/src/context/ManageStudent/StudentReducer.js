import {
    GET_STUDENT_PERPAGE, SET_STUDENT_PAGE
} from '../Type'

export default (state,action)=>{
    switch(action.type){
        case GET_STUDENT_PERPAGE:
            return {
                ...state,
                Students: action.payload.data,
                TotalPage:action.payload.total
            };
        case SET_STUDENT_PAGE:
            return {
                ...state,
                Page:action.payload
            }
        default:
            return state;
    }
} 