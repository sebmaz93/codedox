import { ActionType } from "../action-types";
import {
  MoveBlockAction,
  DeleteBlockAction,
  InsertBlockAction,
  UpdateBlockAction,
  Direction,
} from "../actions";
import { BlockKind } from "../block";

export const moveBlock = (
  id: string,
  direction: Direction
): MoveBlockAction => {
  return {
    type: ActionType.MOVE_BLOCK,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteBlock = (id: string): DeleteBlockAction => {
  return {
    type: ActionType.DELETE_BLOCK,
    payload: {
      id,
    },
  };
};

export const insertBlockBefore = (
  id: string,
  kind: BlockKind
): InsertBlockAction => {
  return {
    type: ActionType.INSERT_BLOCK_BEFORE,
    payload: {
      id,
      kind,
    },
  };
};

export const updateBlock = (id: string, content: string): UpdateBlockAction => {
  return {
    type: ActionType.UPDATE_BLOCK,
    payload: {
      id,
      content,
    },
  };
};
