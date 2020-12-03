import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import './Navbar.css'
import AppContext from '../../../context/Appfeature/AppContext';
import AuthContext from '../../../context/Auth/AuthContext'
const Navbar = (props) => {
    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const {displaysidebar,display_sidebar,displaysubmenu,display_submenu} = appContext
    const {logout} = authContext
    const sidebar = ()=>{
        display_sidebar(displaysidebar ? false : true);
    }
    const submenu = ()=>{
        display_submenu(displaysubmenu ? false : true)
    }
    const onClick =()=>{
        logout();
    }
    return (
        <div className="nav_bar">
            <div>
                <Button onClick={sidebar}>
                    <i className="fas fa-bars"></i>
                </Button>
            </div>
            

            <div className="user_toolbar">
                <Button>
                    <i className="far fa-bell"></i>
                </Button>
                <Button>
                    <i className="far fa-envelope"></i>
                </Button>
                <img src='https://i.pinimg.com/originals/3d/24/34/3d24344aa06cb884ac49e95dcc37afa4.jpg' alt='ava' onClick={submenu}/>
                <div className={displaysubmenu ? 'submenu' : 'submenu dpnone'}>
                    <ul>
                        
                        <li>
                            <a href='/login' onClick={onClick}>Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
