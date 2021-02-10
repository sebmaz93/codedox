import { useActions } from "hooks/use-actions";

interface OwnProps {
  id: string;
}

const ActionsBar: React.FC<OwnProps> = ({ id }) => {
  const { moveBlock, deleteBlock } = useActions();
  return (
    <div>
      <button
        className="button is-primary is-small"
        onClick={() => moveBlock(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveBlock(id, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteBlock(id)}
      >
        <span className="icon">
          <i className="fas fa-trash" />
        </span>
      </button>
    </div>
  );
};

export default ActionsBar;
