import bundlesReducer from './bundlesReducer'
import blocksReducer from './blocksReducer'
import {combineReducers} from 'redux'

const reducers = combineReducers({
  blocks: blocksReducer,
  bundles: bundlesReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
