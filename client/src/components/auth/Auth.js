import React, { useContext, useEffect, useState } from 'react'
import Img1 from './images/2.png'
import './Auth.css'
import AuthContext from '../../context/Auth/AuthContext'
const Auth = (props) => {
    const authContext = useContext(AuthContext);
    const {login,isAuthenticated } = authContext;
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    },[isAuthenticated,props.history])
    const { username, password } = user;
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (username === '' || password === '') {
            alert('Thiếu thông tin')
        } else {
            login({
                username,
                password
            });
        }
    };
    
    return (
        <div className="body">
            <section className="w3l-workinghny-form">
                <div className="workinghny-form-grid">
                    <div className="wrapper">
                        <div className="logo">
                            <h1><a className="brand-logo" href="/"><span>Working</span> Sign In</a></h1>
                        </div>
                        <div className="workinghny-block-grid">
                            <div className="workinghny-left-img align-end">
                                <img src={Img1} className="img-responsive" alt="img" />
                            </div>
                            <div className="form-right-inf">
                                <div className="login-form-content">
                                    <form onSubmit={onSubmit}>
                                        <div className="one-frm">
                                            <label>Name</label>
                                            <input type="text" name="username" value={username} onChange={onChange}/>
                                        </div>
                                        <div className="one-frm">
                                            <label>Password</label>
                                            <input type="password" name="password" value={password} onChange={onChange}/>
                                        </div>
                                        <button className="btn btn-style mt-3" type='submit'>Sign In </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Auth
