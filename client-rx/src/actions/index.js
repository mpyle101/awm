import * as moment from "moment"

import {
    SELECT_DATE,
    SELECT_BLOCK,
    SELECT_PERIOD,
    FETCH_WORKOUTS_SUCCESS,
    FETCH_WORKOUTS_FAILURE
} from './types'

const TODAY = moment()

export const selectDate = (date=TODAY) => ({
    type: SELECT_DATE,
    payload: date
})

export const selectBlock = block => ({
    type: SELECT_BLOCK,
    payload: block
})

export const selectPeriod = period => ({
    type: SELECT_PERIOD,
    payload: period
})

export const fetchWorkoutsSuccess = workouts => ({
    type: FETCH_WORKOUTS_SUCCESS,
    payload: workouts
})

export const fetchWorkoutsFailure = message => ({
    type: FETCH_WORKOUTS_FAILURE,
    payload: message
})