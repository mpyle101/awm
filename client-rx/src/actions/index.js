import {
    SELECT_DATE,
    SELECT_BLOCK,
    SELECT_PERIOD,
    FETCH_WORKOUTS_SUCCESS,
    FETCH_WORKOUTS_FAILURE
} from './types'


export const selectBlock = block => ({
    type: SELECT_BLOCK,
    payload: block
})

export const selectDate = (date, period) => ({
    type: SELECT_DATE,
    payload: { date, period }
})

export const selectPeriod = (date, period) => ({
    type: SELECT_PERIOD,
    payload: { date, period }
})

export const fetchWorkoutsSuccess = workouts => ({
    type: FETCH_WORKOUTS_SUCCESS,
    payload: workouts
})

export const fetchWorkoutsFailure = message => ({
    type: FETCH_WORKOUTS_FAILURE,
    payload: message
})