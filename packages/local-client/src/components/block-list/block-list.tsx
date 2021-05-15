import BlockListItem from 'components/block-list/block-list-item'
import AddBlock from 'components/actions-bar/add-block'
import {useActions} from 'hooks/use-actions'
import {useTypedSelector} from 'hooks/use-typed-selector'
import {Fragment, FC, useEffect} from 'react'
import './block-list.scss'

const BlockList: FC = () => {
  const blocks = useTypedSelector(({blocks: {order, data}}) =>
    order.map(id => data[id])
  )

  const {fetchBlock} = useActions()

  useEffect(() => {
    fetchBlock()
  }, [])

  const renderBlocks = blocks.map(block => (
    <Fragment key={block.id}>
      <BlockListItem key={block.id} block={block} />
      <AddBlock prevBlockId={block.id} />
    </Fragment>
  ))

  return (
    <div className="block-list">
      <AddBlock prevBlockId={null} />
      {renderBlocks}
    </div>
  )
}

export default BlockList
