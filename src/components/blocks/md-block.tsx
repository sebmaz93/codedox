import MdEditor from 'components/editors/md-editor'
import {Block} from 'reduxState'

interface OwnProps {
  block: Block
}

const MdBlock: React.FC<OwnProps> = ({block}) => {
  return <MdEditor block={block} />
}

export default MdBlock
