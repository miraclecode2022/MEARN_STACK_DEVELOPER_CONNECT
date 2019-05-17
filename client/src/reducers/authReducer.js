import isEmpty from '../validations/is-empty'

import {SET_CURRENT_USER} from '../constain/types'

const nameInitialState = {
    isAuthenticated : false,
    user : {}
}

const authReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER :     
            return {
                ...state,
                isAuthenticated : !isEmpty(action.payload),
                user : action.payload
            }
        default:
            return state
    }
}

export default authReducer