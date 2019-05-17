import axios from 'axios'
import {ADD_POST,GET_ERRORS, POST_LOADING, GET_POSTS, DELETE_POST, GET_CURRENT_POST, CLEAR_ERRORS} from '../constain/types'

// Add new post
export const addPost = (postData) => dispatch => {
    axios.post('/posts/create', postData).then(res =>
            dispatch({
                type : ADD_POST,
                payload : res.data
            })
        ).catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
}

// Add new comment for post
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors())
    axios.post(`/posts/comment/${postId}`, commentData).then(res =>
            dispatch({
                type : GET_CURRENT_POST,
                payload : res.data
            })
        ).catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
}

// Get posts
export const getPosts = () => dispatch => {
    dispatch(setLoadingPost());
    axios.get('/posts/').then(res =>
            dispatch({
                type : GET_POSTS,
                payload : res.data
            })
        ).catch(err => dispatch({
            type : GET_POSTS,
            payload : null
        }))
}

// Get current post
export const getCurrentPost = (id) => dispatch => {
    dispatch(setLoadingPost());
    axios.get(`/posts/${id}`).then(res =>
            dispatch({
                type : GET_CURRENT_POST,
                payload : res.data
            })
        ).catch(err => dispatch({
            type : GET_POSTS,
            payload : null
        }))
}

// Loading post
export const setLoadingPost = () => {
    return {
        type : POST_LOADING
    }
}

// add like posts
export const likePost = (id) => dispatch => {
    axios.post(`/posts/like/${id}`).then(res => dispatch(getPosts()))
    .catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
}

// unlike posts
export const unlikePost = (id) => dispatch => {
    axios.post(`/posts/unlike/${id}`).then(res => dispatch(getPosts()))
    .catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
}

// Delete comment
export const deleteComment = (postId, commentId) => dispatch => {

    axios.delete(`/posts/comment/${postId}/${commentId}`).then(res =>
            dispatch({
                type : GET_CURRENT_POST,
                payload : res.data
            })
        ).catch(err => dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        }))
}

// Delete posts
export const deletePost = (id) => dispatch => {

    axios.delete(`/posts/${id}`).then(res =>
            dispatch({
                type : DELETE_POST,
                payload : id
            })
        ).catch(err => dispatch({
            type : GET_POSTS,
            payload : null
        }))
}

// Clear errors
export const clearErrors = () => {
    return {
        type : CLEAR_ERRORS
    }
}