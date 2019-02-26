import {
    FETCH_WORKOUTS_SUCCESS,
    FETCH_WORKOUTS_FAILURE
} from '../actions/types'

export const (state=[], action) => {
    switch (action.type) {
        case FETCH_WORKOUTS_SUCCESS:
            return {
                items: [...action.payload],
                error: null
            }

        case FETCH_WORKOUTS_FAILURE:
            console.log('FAILED', action.payload)
            return {
                items: [],
                error: action.payload
            }

        default:
            return state
    }
}