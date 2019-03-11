import { combineReducers } from 'redux'

import blockReducer from './blockReducer'
import dateReducer from './dateReducer'
import periodReducer from './periodReducer'
import workoutsReducer from './workoutsReducer'

export default combineReducers({
    period: periodReducer,
    selectedBlock: blockReducer,    
    selectedDate: dateReducer,
    workouts: workoutsReducer
})