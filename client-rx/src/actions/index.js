import * as moment from "moment"

import {
    SELECT_DATE,
    FETCH_WORKOUTS_SUCCESS,
    FETCH_WORKOUTS_FAILURE
} from './types'

const TODAY = moment()

export const selectDate = (date=TODAY) => ({
    type: SELECT_DATE,
    payload: date
})

export const fetchWorkoutsSuccess = workouts => ({
    type: FETCH_WORKOUTS_SUCCESS,
    payload: workouts
})

export const fetchWorkoutsFailure = message => ({
    type: FETCH_WORKOUTS_FAILURE,
    payload: message
})