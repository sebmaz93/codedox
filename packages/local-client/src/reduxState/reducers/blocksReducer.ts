import produce from 'immer'
import {v4 as uuid} from 'uuid'
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
  order: ['123', '1323', '12323', '131323'],
  data: {
    123: {content: '', kind: 'text', id: '123'},
    1323: {content: '', kind: 'code', id: '1323'},
    12323: {content: '', kind: 'text', id: '12323'},
    131323: {content: '', kind: 'code', id: '131323'}
  }
}

const reducer = produce((state: BlocksState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_BLOCKS_ERROR:
      state.error = action.payload
      return state

    case ActionType.FETCH_BLOCKS:
      state.loading = true
      state.error = null
      return state

    case ActionType.FETCH_BLOCKS_COMPLETE:
      state.order = action.payload.map(block => block.id)
      state.data = action.payload.reduce((acc, block) => {
        acc[block.id] = block
        return acc
      }, {} as BlocksState['data'])
      return state

    case ActionType.FETCH_BLOCKS_ERROR:
      state.loading = false
      state.error = action.payload
      return state

    case ActionType.MOVE_BLOCK:
      const index = state.order.findIndex(id => id === action.payload.id)
      const targetIndex =
        action.payload.direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state
      }
      state.order[index] = state.order[targetIndex]
      state.order[targetIndex] = action.payload.id
      return state

    case ActionType.DELETE_BLOCK:
      delete state.data[action.payload.id]
      state.order = state.order.filter(id => id !== action.payload.id)
      return state

    case ActionType.INSERT_BLOCK_AFTER:
      const block: Block = {
        content: '',
        kind: action.payload.kind,
        id: uuid()
      }
      state.data[block.id] = block
      const _index = state.order.findIndex(id => id === action.payload.id)
      if (_index < 0) {
        state.order.unshift(block.id)
      } else {
        state.order.splice(_index + 1, 0, block.id)
      }
      return state

    case ActionType.UPDATE_BLOCK:
      state.data[action.payload.id].content = action.payload.content
      return state
    default:
      return state
  }
})

export default reducer
