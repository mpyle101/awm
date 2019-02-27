import * as moment from 'moment'
import { combineEpics, ofType } from 'redux-observable'
import { of as observableOf } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import {
    fetchWorkoutsSuccess,
    fetchWorkoutsFailure
} from '../actions'
import { SELECT_DATE } from '../actions/types'

import { fetchWorkouts } from '../apis'

const process = workouts => 
    workouts.map(item => ({ ...item, date: moment(item.date)}))

const fetchWorkoutsEpic = action$ => {
    return action$.pipe(
        ofType(SELECT_DATE),
        switchMap(({ payload }) => fetchWorkouts(payload), (action, resp) => resp),
        map(workouts => process(workouts)),
        map(workouts => fetchWorkoutsSuccess(workouts)),
        catchError(err => observableOf(fetchWorkoutsFailure(err.message)))
    )
}

export default combineEpics(fetchWorkoutsEpic)