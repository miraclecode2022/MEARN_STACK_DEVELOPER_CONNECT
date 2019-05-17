import axios from 'axios'
import {GET_MY_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES} from '../constain/types'

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('/profile').then(res => {
        dispatch({
            type : GET_MY_PROFILE,
            payload : res.data
        })
    }).catch(err => {
        dispatch({
            type : GET_MY_PROFILE,
            payload : {}
        })
    })
}

// getProfileByHandle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading())
    axios.get(`/profile/handle/${handle}`).then(res => {
        dispatch({
            type : GET_MY_PROFILE,
            payload : res.data
        })
    }).catch(err => {
        dispatch({
            type : GET_MY_PROFILE,
            payload : null
        })
    })
}

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios.post('/profile/createProfile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            })
        )
}

// Add Experience
export const addExperience = (expData, history) => dispatch => {
    axios.post('profile/experience', expData).then(res => {
        history.push('/dashboard')
    }).catch(err => {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    })
}

// Add Education
export const addEducation = (eduData, history) => dispatch => {
    axios.post('profile/education', eduData).then(res => {
        history.push('/dashboard')
    }).catch(err =>
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        })
    )
}

//getProfiles
export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get('profile/all').then(res => {
        dispatch({
            type : GET_PROFILES,
            payload : res.data
        })
    }).catch(err => {
        dispatch({
            type : GET_PROFILES,
            payload : null
        })
    })
}

// Profile Loading
export const setProfileLoading = () => {
    return {
        type : PROFILE_LOADING
    }
}

// Clear Profile
export const clearCurrentProfile = () => {
    return {
        type : CLEAR_CURRENT_PROFILE
    }
}

// deleteExperience
export const deleteExperience = (id) => dispatch => {
    axios.delete(`profile/experience/${id}`).then(res =>
        dispatch({
            type : GET_MY_PROFILE,
            payload : res.data
        })).catch(err => 
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
        }))
}

// deleteEducation
export const deleteEducation = (id) => dispatch => {
    axios.delete(`profile/education/${id}`).then(res =>
        dispatch({
            type : GET_MY_PROFILE,
            payload : res.data
        })).catch(err => 
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
        }))
}

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
    if(window.confirm('Are You Sure Want Delete This Account ? CAN NOT BE UNDONE !')){
        axios.delete('/users/delete')
            .then(res => 
                dispatch({
                    type : SET_CURRENT_USER,
                    payload : {}
                }),
                dispatch({
                    type : GET_MY_PROFILE,
                    payload : {}
                })
            )
            .catch(err => 
                dispatch({
                    type : GET_ERRORS,
                    payload : err.response.data
                })
            )
    }
}