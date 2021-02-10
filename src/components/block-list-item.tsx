import { Block } from "reduxState";
import CodeBlock from "components/code-block";
import MdEditor from "components/md-editor";
import ActionsBar from "components/actions-bar";

interface OwnProps {
  block: Block;
}

const BlockListItem: React.FC<OwnProps> = ({ block }) => {
  let child: JSX.Element;
  if (block.kind === "code") {
    child = <CodeBlock block={block} />;
  } else {
    child = <MdEditor block={block} />;
  }
  return (
    <div>
      <ActionsBar id={block.id} />
      {child}
    </div>
  );
};

export default BlockListItem;
