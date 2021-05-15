export enum ActionType {
  MOVE_BLOCK = 'move_block',
  DELETE_BLOCK = 'delete_block',
  INSERT_BLOCK_AFTER = 'insert_block_after',
  UPDATE_BLOCK = 'update_block',
  BUNDLE_START = 'bundle_start',
  BUNDLE_COMPLETE = 'bundle_complete',
  FETCH_BLOCKS = 'fetch_blocks',
  FETCH_BLOCKS_COMPLETE = 'fetch_blocks_complete',
  FETCH_BLOCKS_ERROR = 'fetch_blocks_error',
  SAVE_BLOCKS_ERROR = 'save_blocks_error'
}
