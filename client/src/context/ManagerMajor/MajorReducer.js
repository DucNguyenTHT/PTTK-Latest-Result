import {
    SET_MAJOR_PAGE,
    GET_MAJOR_PERPAGE,
    GET_ALL_MAJORDATA,
    GET_ALL_MAJOR_BY_DEPARTMENT,
    LOAD_SEMESTER
} from '../Type'

export default (state,action)=>{
    switch(action.type){
        case GET_MAJOR_PERPAGE:
            return {
                ...state,
                Majors:action.payload.data,
                TotalPage:action.payload.total
            }
        case SET_MAJOR_PAGE:
            return {
                ...state,
                Page:action.payload
            }
        case GET_ALL_MAJOR_BY_DEPARTMENT:
        case GET_ALL_MAJORDATA:
            return {
                ...state,
                AllMarjor:action.payload.data
            }
        case LOAD_SEMESTER:
            return {
                ...state,
                semester:action.payload.data
            }
        default:
            return{
                state
            }
    }
}