import BlockListItem from "components/block-list-item";
import { useTypedSelector } from "hooks/use-typed-selector";

const BlockList: React.FC = () => {
  const blocks = useTypedSelector(({ blocks: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderBlocks = blocks.map((block) => (
    <BlockListItem key={block.id} block={block} />
  ));

  return <div>{renderBlocks}</div>;
};

export default BlockList;
