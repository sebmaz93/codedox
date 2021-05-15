import {ActionType} from '../action-types'
import {Block, BlockKind} from '../block'

export type Direction = 'up' | 'down'

export interface MoveBlockAction {
  type: ActionType.MOVE_BLOCK
  payload: {
    id: string
    direction: Direction
  }
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK
  payload: {
    id: string
  }
}

export interface InsertBlockAction {
  type: ActionType.INSERT_BLOCK_AFTER
  payload: {
    id: string | null
    kind: BlockKind
  }
}

export interface UpdateBlockAction {
  type: ActionType.UPDATE_BLOCK
  payload: {
    id: string
    content: string
  }
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START
  payload: {
    blockId: string
  }
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE
  payload: {
    blockId: string
    bundle: {
      code: string
      err: string
    }
  }
}

export interface FetchBlocksAction {
  type: ActionType.FETCH_BLOCKS
}

export interface FetchBlocksCompleteAction {
  type: ActionType.FETCH_BLOCKS_COMPLETE
  payload: Block[]
}

export interface FetchBlocksErrorAction {
  type: ActionType.FETCH_BLOCKS_ERROR
  payload: string
}

export interface SaveBlocksError {
  type: ActionType.SAVE_BLOCKS_ERROR
  payload: string
}

export type Action =
  | MoveBlockAction
  | DeleteBlockAction
  | InsertBlockAction
  | UpdateBlockAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchBlocksAction
  | FetchBlocksCompleteAction
  | FetchBlocksErrorAction
  | SaveBlocksError
