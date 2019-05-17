import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import {GET_ERRORS, SET_CURRENT_USER} from '../constain/types'



// Register Reducer
export const registerReducer = (userData, history) => dispatch => {
    axios.post('/users/register', userData)
        .then(res => {
            return history.push('/login');
        })
        .catch(err => 
            dispatch({
                type : GET_ERRORS,
                errors : err.response.data
            })
        )

}

// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios.post('/users/login', userData)
        .then(res => {
            // Save token to local
            const { token } = res.data;
            localStorage.setItem('jwtToken', token)
            // Set token to Auth Header
            setAuthToken(token);
            //set current user
            dispatch(setCurrentUser(res.data.user))
        })
        .catch(err => 
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            })
        )
}

// Set Login User
export const setCurrentUser = (user) => {
    return {
        type : SET_CURRENT_USER,
        payload : user
    }
}

// Set Logout User
export const logoutUser = () => dispatch => {
    // delete token in database
    axios.post('/users/logoutAll')
    // Remove token from local
    localStorage.removeItem('jwtToken')
    // Remove auth header
    setAuthToken(false)
    // set uset to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}