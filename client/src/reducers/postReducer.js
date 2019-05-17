import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_CURRENT_POST } from '../constain/types'

const nameInitialState = {
    posts : [],
    post : {},
    loading : false
}

const postReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case POST_LOADING : 
            return {
                ...state,
                loading : true
            }
        case ADD_POST :
            return {
                ...state,
                posts : [action.payload, ...state.posts]
            }
        case GET_POSTS : 
            return {
                ...state,
                posts : action.payload,
                loading : false
            }
        case GET_CURRENT_POST :
            return {
                ...state,
                post : action.payload,
                loading : false
            }
        case DELETE_POST :
            return {
                ...state,
                posts : state.posts.filter(post => post._id !== action.payload)
            }
        default:
            return state
    }
}

 export default postReducer