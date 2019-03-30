import * as moment from "moment"
import { SELECT_DATE } from '../actions/types'

const TODAY = moment().valueOf()

export default (state=TODAY, action) => {
    switch (action.type) {
        case SELECT_DATE:
            return action.payload.date.valueOf()

        default:
            return state
    }
}