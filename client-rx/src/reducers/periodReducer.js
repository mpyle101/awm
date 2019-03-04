import { SELECT_PERIOD } from '../actions/types'

export default (state=30, action) => {
    switch (action.type) {
        case SELECT_PERIOD:
            return action.payload

        default:
            return state
    }
}