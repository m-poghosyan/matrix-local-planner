import { combineReducers } from 'redux'

import Menus from './MenusReducer'
import Concepts from './ConceptsReducer'

const reducers = combineReducers({
  Menus,
  Concepts,
})

export default reducers
