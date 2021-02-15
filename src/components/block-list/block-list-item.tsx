import {Block} from 'reduxState'
import CodeBlock from 'components/blocks/code-block'
import MdBlock from 'components/blocks/md-block'
import ActionsBar from 'components/actions-bar/actions-bar'
import './block-list-item.scss'

interface OwnProps {
  block: Block
}

const BlockListItem: React.FC<OwnProps> = ({block}) => {
  let child: JSX.Element
  if (block.kind === 'code') {
    child = (
      <>
        <CodeBlock block={block} />
      </>
    )
  } else {
    child = <MdBlock block={block} />
  }
  return (
    <div className="block-list-item">
      <div className="actions-bar-wrapper">
        <ActionsBar id={block.id} />
      </div>
      {child}
    </div>
  )
}

export default BlockListItem
