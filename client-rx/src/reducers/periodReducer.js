import { SELECT_PERIOD } from '../actions/types'

export default (state=90, action) => {
    switch (action.type) {
        case SELECT_PERIOD:
            console.log(action)
            return action.payload.period

        default:
            return state
    }
}