import BlockListItem from 'components/block-list/block-list-item'
import {useTypedSelector} from 'hooks/use-typed-selector'
import './block-list.scss'

const BlockList: React.FC = () => {
  const blocks = useTypedSelector(({blocks: {order, data}}) =>
    order.map(id => data[id])
  )

  const renderBlocks = blocks.map(block => (
    <BlockListItem key={block.id} block={block} />
  ))

  return <div className="block-list">{renderBlocks}</div>
}

export default BlockList
