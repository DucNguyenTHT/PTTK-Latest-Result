import {
    GETACCESS,
    REMOVE_RST,
    GET_ALL
} from '../Type'

export default (state,action)=>{
    switch(action.type){
        case GETACCESS:
            return {
                ...state,
                StudentRegiterTopics:action.payload.data
            }
        case GET_ALL:
            return {
                ...state,
                StudentRegiterTopics:action.payload.data
            }
        case REMOVE_RST:
            return {
                ...state,
                StudentRegiterTopics: state.StudentRegiterTopics.filter(
                    temp => temp._id !== action.payload
                )
            }
        default:
            return{
                state
            }
    }
}