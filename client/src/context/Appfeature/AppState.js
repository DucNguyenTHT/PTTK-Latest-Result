import React, {  useReducer } from 'react'
import AppContext from './AppContext'
import AppReducer from './AppReduce'
import {
    DISPLAY_SIDEBAR, 
    DISPLAY_SUBMENU
} from '../Type'
const AppState = props => {
    const initialState = {
        displaysidebar: true,
        displaysubmenu: false,
    }
    const [state,dispatch] = useReducer(AppReducer,initialState)

    //const onOff 
    const display_sidebar = (current) =>{
        dispatch({
            type:DISPLAY_SIDEBAR,
            payload : current,
        })
    }

    const display_submenu = (current) =>{
        dispatch({
            type:DISPLAY_SUBMENU,
            payload : current,
        })
    }
    return (
        <AppContext.Provider
            value= {{
                displaysidebar: state.displaysidebar,
                displaysubmenu: state.displaysubmenu,
                display_sidebar,
                display_submenu
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState
