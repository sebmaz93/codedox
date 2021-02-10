import blocksReducer from './blocksReducer'
import {combineReducers} from 'redux'

const reducers = combineReducers({
  blocks: blocksReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
