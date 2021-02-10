interface OwnProps {
  onClick: () => void
  iconClass: string
}

const ActionButton: React.FC<OwnProps> = ({onClick, iconClass}) => {
  return (
    <button className="button is-primary is-small" onClick={() => onClick()}>
      <span className="icon">
        <i className={`fas ${iconClass}`} />
      </span>
    </button>
  )
}

export default ActionButton
