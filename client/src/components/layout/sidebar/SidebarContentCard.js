import React from 'react'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
const SidebarContentCard = (props) => {
    return (
            <NavLink exact to={props.link} activeClassName='main-nav-active'>
                <Button >
                    <i className={props.icon}></i>
                    <span>{props.title}</span>
                </Button>
            </NavLink>
    )
}

SidebarContentCard.defaultProps  = {
    icon : 'far fa-user',
    title: 'Dashboard',
    link : '/'
}
export default SidebarContentCard
