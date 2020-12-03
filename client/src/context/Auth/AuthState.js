import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import setAuthToken from '../../utils/SetAuthToken';
import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    AUTH_ERROR,
} from '../Type';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: false,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('http://localhost:5000/api/auth/me');

            dispatch({
            type: USER_LOADED,
            payload: res.data
            });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    };


    const login = async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const res = await axios.post('http://localhost:5000/api/auth/login', formData, config);
    console.log(res)
    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });
    loadUser();
    };

    const logout = () => dispatch({ type: LOGOUT });


    return (
    <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            loadUser,
            login,
            logout,
        }}
    >
        {props.children}
    </AuthContext.Provider>
    );
};

export default AuthState;