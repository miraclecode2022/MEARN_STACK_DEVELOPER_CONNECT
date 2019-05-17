import {GET_MY_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_PROFILES} from '../constain/types'

const nameInitialState = {
    profile : null,
    profiles : null,
    loading : false
}

const profileReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading : true
            }
        case GET_MY_PROFILE :
            return {
                ...state,
                profile : action.payload,
                loading : false
            }
        case GET_PROFILES :
            return {
                ...state,
                profiles : action.payload,
                loading : false
            }
        case CLEAR_CURRENT_PROFILE :
            return {
                ...state,
                profile : null
            }
        default:
            return state
    }
}

export default profileReducer