import {ActionType} from '../action-types'
import {Action} from '../actions'
import {Block} from '../block'

interface BlocksState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Block
  }
}

const initialState: BlocksState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const reducer = (
  state: BlocksState = initialState,
  action: Action
): BlocksState => {
  switch (action.type) {
    case ActionType.MOVE_BLOCK:
      return state
    case ActionType.DELETE_BLOCK:
      return state
    case ActionType.INSERT_BLOCK_AFTER:
      return state
    case ActionType.UPDATE_BLOCK:
      return state
    default:
      return state
  }
}

export default reducer
