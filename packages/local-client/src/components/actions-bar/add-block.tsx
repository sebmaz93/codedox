import {useActions} from 'hooks/use-actions'
import styled from 'styled-components'

const AddBlockStyled = styled.div`
  position: relative;
  opacity: 0.1;
  transition: opacity 300ms ease-in 100ms;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0 !important;
    transition: opacity 0s;
  }
`

const DividerStyled = styled.div`
  position: absolute;
  top: 50%;
  bottom: 50%;
  left: 5%;
  right: 5%;
  border-bottom: 1px solid gray;
  z-index: -1;
`

const AddButtonsStyled = styled.div`
  display: flex;
  justify-content: center;
  > button {
    margin: 0 25px;
  }
`

interface OwnProps {
  prevBlockId: string | null
}

const AddBlock: React.FC<OwnProps> = ({prevBlockId}) => {
  const {insertBlockAfter} = useActions()
  return (
    <AddBlockStyled>
      <AddButtonsStyled>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBlockAfter(prevBlockId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertBlockAfter(prevBlockId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </AddButtonsStyled>
      <DividerStyled />
    </AddBlockStyled>
  )
}

export default AddBlock
