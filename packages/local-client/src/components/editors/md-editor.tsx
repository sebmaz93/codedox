import MDEditor from '@uiw/react-md-editor'
import {useActions} from 'hooks/use-actions'
import {FC, useState, useEffect, useRef} from 'react'
import './md-editor.scss'
import {Block} from 'reduxState'

interface OwnProps {
  block: Block
}

const MdEditor: FC<OwnProps> = ({block}) => {
  const [editing, setEditing] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const {updateBlock} = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        event.target &&
        wrapperRef.current.contains(event.target as Node)
      ) {
        return
      }
      setEditing(false)
    }
    document.addEventListener('click', listener, {capture: true})

    return () => {
      document.removeEventListener('click', listener, {capture: true})
    }
  }, [])

  if (editing) {
    return (
      <div className="markdown-editor" ref={wrapperRef}>
        <MDEditor
          value={block.content}
          onChange={value => updateBlock(block.id, value || '')}
        />
      </div>
    )
  }
  return (
    <div className="markdown-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={block.content || 'click to edit'} />
      </div>
    </div>
  )
}

export default MdEditor
