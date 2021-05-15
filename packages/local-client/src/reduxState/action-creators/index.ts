import axios from 'axios'
import bundle from 'bundler'
import {Dispatch} from 'redux'
import {RootState} from 'reduxState/reducers'
import {ActionType} from '../action-types'
import {
  Action,
  DeleteBlockAction,
  Direction,
  InsertBlockAction,
  MoveBlockAction,
  UpdateBlockAction
} from '../actions'
import {Block, BlockKind} from '../block'

export const moveBlock = (
  id: string,
  direction: Direction
): MoveBlockAction => {
  return {
    type: ActionType.MOVE_BLOCK,
    payload: {
      id,
      direction
    }
  }
}

export const deleteBlock = (id: string): DeleteBlockAction => {
  return {
    type: ActionType.DELETE_BLOCK,
    payload: {
      id
    }
  }
}

export const insertBlockAfter = (
  id: string | null,
  kind: BlockKind
): InsertBlockAction => {
  return {
    type: ActionType.INSERT_BLOCK_AFTER,
    payload: {
      id,
      kind
    }
  }
}

export const updateBlock = (id: string, content: string): UpdateBlockAction => {
  return {
    type: ActionType.UPDATE_BLOCK,
    payload: {
      id,
      content
    }
  }
}

export const createBundle = (blockId: string, input: string) => async (
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: {
      blockId
    }
  })

  const result = await bundle(input)

  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      blockId,
      bundle: result
    }
  })
}

export const fetchBlock = () => async (dispatch: Dispatch<Action>) => {
  dispatch({type: ActionType.FETCH_BLOCKS})
  try {
    const {data}: {data: Block[]} = await axios.get('/blocks')
    dispatch({type: ActionType.FETCH_BLOCKS_COMPLETE, payload: data})
  } catch (err) {
    dispatch({type: ActionType.FETCH_BLOCKS_ERROR, payload: err.message})
  }
}

export const saveBlocks = () => async (
  dispatch: Dispatch<Action>,
  getState: () => RootState
) => {
  const {
    blocks: {data, order}
  } = getState()

  const blocks = order.map(id => data[id])
  try {
    await axios.post('blocks', {blocks})
  } catch (err) {
    dispatch({type: ActionType.SAVE_BLOCKS_ERROR, payload: err.message})
  }
}
