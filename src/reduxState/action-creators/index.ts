import bundle from 'bundler'
import {Dispatch} from 'redux'
import {ActionType} from '../action-types'
import {
  Action,
  DeleteBlockAction,
  Direction,
  InsertBlockAction,
  MoveBlockAction,
  UpdateBlockAction
} from '../actions'
import {BlockKind} from '../block'

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
