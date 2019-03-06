import { combineReducers } from 'redux'

import dateReducer from './dateReducer'
import blockReducer from './blockReducer'
import periodReducer from './periodReducer'
import workoutsReducer from './workoutsReducer'

export default combineReducers({
    block: blockReducer,
    period: periodReducer,
    selectedDate: dateReducer,
    workouts: workoutsReducer
})