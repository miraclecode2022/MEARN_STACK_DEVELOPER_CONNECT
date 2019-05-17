import {GET_ERRORS, CLEAR_ERRORS} from '../constain/types' 
const nameInitialState = {}

const errorsReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case GET_ERRORS :
            return action.payload
        case CLEAR_ERRORS : 
            return {}
        default:
            return state
    }
}

export default errorsReducer