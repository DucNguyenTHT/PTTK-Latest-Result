import React from 'react'
import { Link } from 'react-router-dom'
import logotlu from '../img/LogoTLU.jpg'
const Sidebarheader = () => {
    return (
        <div className="Sidebar_header">
            <Link to="/">
                <div className='logo'>
                    <img src={logotlu} alt="logo"/>
                </div>
                <span>Đăng ký ra trường</span>
            </Link>
        </div>
    )
}

export default Sidebarheader
