import React, { useContext } from 'react'
import SidebarContentCard from './SidebarContentCard'
import {Admin,Teacher,student} from './SidebarContenData'
import AuthContext from '../../../context/Auth/AuthContext'
const Sidebarcontent = () => {
    const authContext = useContext(AuthContext)
    const {user}= authContext;

    return (
        <div className='sidebar_content'>
            {user&& user.role ==='manager' && Admin.map( (data,index) => <SidebarContentCard key={index} link={data.link} icon={data.icon} title={data.title}/>)}
            {user&& user.role ==='teacher' && Teacher.map( (data,index) => <SidebarContentCard key={index} link={data.link} icon={data.icon} title={data.title}/>)}
            {user&& user.role ==='student' && student.length > 0 && student.map( (data,index) => <SidebarContentCard key={index} link={data.link} icon={data.icon} title={data.title}/>)}
        </div>
    )
}

export default Sidebarcontent
