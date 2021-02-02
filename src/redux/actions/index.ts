import { ActionType } from "../action-types";
import { BlockKind } from "../block";

export type Direction = "up" | "down";

export interface MoveBlockAction {
  type: ActionType.MOVE_BLOCK;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteBlockAction {
  type: ActionType.DELETE_BLOCK;
  payload: {
    id: string;
  };
}

export interface InsertBlockAction {
  type: ActionType.INSERT_BLOCK_BEFORE;
  payload: {
    id: string | null;
    kind: BlockKind;
  };
}

export interface UpdateBlockAction {
  type: ActionType.UPDATE_BLOCK;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveBlockAction
  | DeleteBlockAction
  | InsertBlockAction
  | UpdateBlockAction;
