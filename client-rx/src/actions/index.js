import {
    SELECT_NEXT_MONTH,
    SELECT_NEXT_YEAR,
    SELECT_PREV_MONTH,
    SELECT_PREV_YEAR,
    SELECT_TODAY
} from './types'

export const selectToday     = () => ({ type: SELECT_TODAY })
export const selectNextMonth = () => ({ type: SELECT_NEXT_MONTH })
export const selectPrevMonth = () => ({ type: SELECT_PREV_MONTH })
export const selectNextYear  = () => ({ type: SELECT_NEXT_YEAR })
export const selectPrevYear  = () => ({ type: SELECT_PREV_YEAR })
