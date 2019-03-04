import { combineReducers } from 'redux'

import dateReducer from './dateReducer'
import periodReducer from './periodReducer'
import workoutsReducer from './workoutsReducer'

export default combineReducers({
    period: periodReducer,
    selectedDate: dateReducer,
    workouts: workoutsReducer
})