import ActionsBar from 'components/actions-bar/actions-bar'
import {Dispatch} from 'redux'
import {Action} from 'reduxState/actions'
import {ActionType} from 'reduxState/action-types'
import {saveBlocks} from 'reduxState/action-creators'
import {RootState} from 'reduxState/reducers'

export const persistMiddleware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) => {
  let timer: NodeJS.Timeout
  return (next: (action: Action) => void) => (action: Action) => {
    next(action)

    if (
      [
        ActionType.MOVE_BLOCK,
        ActionType.DELETE_BLOCK,
        ActionType.UPDATE_BLOCK,
        ActionType.INSERT_BLOCK_AFTER
      ].includes(action.type)
    ) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        saveBlocks()(dispatch, getState)
      }, 250)
    }
  }
}
