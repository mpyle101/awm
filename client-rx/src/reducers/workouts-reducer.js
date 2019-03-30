import {
    FETCH_WORKOUTS_SUCCESS,
    FETCH_WORKOUTS_FAILURE
} from '../actions/types'

const initialState = {
    items: [],
    error: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case FETCH_WORKOUTS_SUCCESS:
            return {
                items: [...action.payload],
                error: null
            }

        case FETCH_WORKOUTS_FAILURE:
            return {
                items: [],
                error: action.payload
            }

        default:
            return state
    }
}