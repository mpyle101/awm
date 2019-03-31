import * as moment from 'moment'
import { combineEpics, ofType } from 'redux-observable'
import { of as observableOf } from 'rxjs'
import {
    catchError,
    debounceTime,
    map,
    switchMap,
    takeUntil
} from 'rxjs/operators'

import {
    fetchWorkoutsSuccess,
    fetchWorkoutsFailure
} from '../actions'
import {
    SELECT_DATE,
    SELECT_PERIOD,
    FETCH_WORKOUTS_CANCEL
} from '../actions/types'

import { fetchWorkouts } from '../apis'

const process = workouts => 
    workouts.map(item => ({ ...item, date: moment(item.date)}))

const fetchWorkoutsEpic = action$ =>
    action$.pipe(
        ofType(SELECT_DATE, SELECT_PERIOD),
        debounceTime(200),
        switchMap(({payload: {date, period}}) => fetchWorkouts(date, period).pipe(
            map(resp => process(resp)),
            map(workouts => fetchWorkoutsSuccess(workouts)),
            takeUntil(action$.pipe(ofType(FETCH_WORKOUTS_CANCEL))),
            catchError(err => observableOf(fetchWorkoutsFailure(err.message)))
        ))
    )

export default combineEpics(fetchWorkoutsEpic)