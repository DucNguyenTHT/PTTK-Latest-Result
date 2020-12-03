import {
    GET_TEACHER_DEPARTMENT_PERPAGE,
    SET_TEACHER_DEPARTMENT_PAGE
} from '../Type'

export default (state,action)=>{
    switch(action.type){
        case GET_TEACHER_DEPARTMENT_PERPAGE:
            return {
                ...state,
                TeacherDepartment:action.payload.data,
                TotalPage:action.payload.total
            }
        case SET_TEACHER_DEPARTMENT_PAGE:
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