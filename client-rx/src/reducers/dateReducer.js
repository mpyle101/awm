import * as moment from "moment"
import { handleActions } from 'redux-actions'

import {
    selectDate,
    selectNextDate,
    selectPrevDate
} from '../actions'

const TODAY = moment()

export default handleActions(
    {
        [selectDate]: (state, { payload: { date }}) => date,
        [selectNextDate]: (state, { payload: { unit }}) => {
            return moment(state).add(1, unit)
        },
        [selectPrevDate]: (state, { payload: { unit }}) => {
            return moment(state).subtract(1, unit)
        }
    },
    TODAY
)

