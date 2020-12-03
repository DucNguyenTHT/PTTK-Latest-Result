import {
    DISPLAY_SIDEBAR,
    DISPLAY_SUBMENU
} from '../Type'

export default (state,action) => {
    switch(action.type){
        case DISPLAY_SIDEBAR:
            return {
                ...state,
                displaysidebar: action.payload,
            };
        case DISPLAY_SUBMENU:
            return{
                ...state,
                displaysubmenu: action.payload,
            }
        default:
            return state;
    }

}