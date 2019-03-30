import { combineReducers } from 'redux'

import blockReducer from './block-reducer'
import dateReducer from './date-reducer'
import periodReducer from './period-reducer'
import workoutsReducer from './workouts-reducer'

export default combineReducers({
    period: periodReducer,
    selectedBlock: blockReducer,    
    selectedDate: dateReducer,
    workouts: workoutsReducer
})