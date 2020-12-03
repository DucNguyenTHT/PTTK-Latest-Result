import React, { useContext } from 'react'
import Sidebarcontent from './Sidebarcontent'
import Sidebarfooter from './Sidebarfooter'
import Sidebarheader from './Sidebarheader'
import './Sidebar.css'
import AppContext from '../../../context/Appfeature/AppContext'
const Sidebar = () => {
    const appContext = useContext(AppContext);
    const {displaysidebar} = appContext;
    return(
        <div className={displaysidebar ? 'side_bar' : 'side_bar dpnone'}>
            <div className="container">
                <Sidebarheader/>
                <Sidebarcontent/>
                <Sidebarfooter/>
            </div>
        </div>
    )
}

export default Sidebar
