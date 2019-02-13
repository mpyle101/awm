import * as moment from "moment"
import { createActions } from 'redux-actions'

const TODAY = moment()

export const {
    selectDate,
    selectNextDate,
    selectPrevDate
} = createActions(
    {
        'SELECT_DATE': (date=TODAY) => ({ date }),
        'SELECT_NEXT_DATE': (unit='month') => ({ unit }),
        'SELECT_PREV_DATE': (unit='month') => ({ unit })
    }
)