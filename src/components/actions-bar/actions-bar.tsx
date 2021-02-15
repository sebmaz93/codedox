import ActionButton from 'components/common/action-button'
import {useActions} from 'hooks/use-actions'
import './actions-bar.scss'

interface OwnProps {
  id: string
}

const ActionsBar: React.FC<OwnProps> = ({id}) => {
  const {moveBlock, deleteBlock} = useActions()
  return (
    <div className="actions-bar">
      <ActionButton
        onClick={() => moveBlock(id, 'up')}
        iconClass="fa-arrow-up"
      />
      <ActionButton
        onClick={() => moveBlock(id, 'down')}
        iconClass="fa-arrow-down"
      />
      <ActionButton onClick={() => deleteBlock(id)} iconClass="fa-trash" />
    </div>
  )
}

export default ActionsBar
