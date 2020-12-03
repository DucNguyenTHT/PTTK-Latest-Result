import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../context/Auth/AuthContext'
import './Profile.css'
const Profile = (props) => {
    const authContext = useContext(AuthContext)
    const {user,loadUser} = authContext
    useEffect(()=>{
        loadUser()
        // eslint-disable-next-line
    },[])
    return (
        <div className='profile_ref'>
            <div className="profile_left mg-top-50">
                <div className="fix-img">
                    <img src={user && `http://localhost:5000/upload/img/${user.image}`} alt='Avatar'/>
                </div>
                <h1>{user && user.username}</h1>
                <h3>{user && user.name}</h3>
            </div>
            <div className="profile_right mg-top-50 w-100">
                <h3>
                    Ngày Sinh: {user && (
                        user.dateofbirth.split('T')[0].split('-')[2]+'-'+
                        user.dateofbirth.split('T')[0].split('-')[1]+'-'+
                        user.dateofbirth.split('T')[0].split('-')[0]
                    )}
                </h3>
                <h3>
                    Địa chỉ nhà: {user && user.address}
                </h3>
                <h3>
                    Số điện thoại: {user && user.phonenumber}
                </h3>
                <h3>
                    Chức vụ: {user && user.role}
                </h3>
            </div>
        </div>
    )
}

export default Profile
