import { combineReducers } from 'redux'

import dateReducer from './dateReducer'
import workoutsReducer from './workoutsReducer'

export default combineReducers({
    selectedDate: dateReducer,
    workouts: workoutsReducer
})