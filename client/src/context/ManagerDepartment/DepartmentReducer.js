import {
    SET_DEPARTMENT_PAGE,
    GET_DEPARTMENT_PERPAGE
} from '../Type'

export default (state,action)=>{
    switch(action.type){
        case GET_DEPARTMENT_PERPAGE:
            return {
                ...state,
                Departments:action.payload.data,
                TotalPage:action.payload.total
            }
        case SET_DEPARTMENT_PAGE:
            return {
                ...state,
                Page:action.payload
            }
        default:
            return{
                state
            }
    }
}