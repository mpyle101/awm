import * as moment from "moment"

import {
    SELECT_TODAY,
    SELECT_NEXT_MONTH,
    SELECT_PREV_MONTH,
    SELECT_NEXT_YEAR,
    SELECT_PREV_YEAR
} from '../actions/types'

const TODAY = moment()

export default (state=TODAY, action) => {
    
    switch (action.type) {
        case SELECT_TODAY:
            return TODAY

        case SELECT_NEXT_MONTH:
            return moment(state).add(1, 'month')

        case SELECT_PREV_MONTH:
            return moment(state).subtract(1, 'month')

        case SELECT_NEXT_YEAR:
            return moment(state).add(1, 'year')

        case SELECT_PREV_YEAR:
            return moment(state).subtract(1, 'year')

        default:
            return state
    }
}
