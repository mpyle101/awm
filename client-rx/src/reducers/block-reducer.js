import * as clone from 'clone-deep'
import { SELECT_BLOCK } from '../actions/types'

export default (state=null, action) => {
    switch (action.type) {
        case SELECT_BLOCK:
            return clone(action.payload)

        default:
            return state
    }
}