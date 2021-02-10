import {useActions} from 'hooks/use-actions'
import {useState, useEffect} from 'react'
import {Block} from 'reduxState'
import CodeEditor from 'components/editors/code-editor'
import bundler from 'bundler'
import Preview from 'components/preview/preview'
import Resizable from 'components/common/resizable'

interface OwnProps {
  block: Block
}

const CodeBlock: React.FC<OwnProps> = ({block}) => {
  const [code, setCode] = useState<string>('')
  const [err, setErr] = useState<string>('')
  const {updateBlock} = useActions()

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(block.content)
      setCode(output.code)
      setErr(output.err)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [block.content])

  return (
    <Resizable direction="v">
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="h">
          <CodeEditor
            initialValue={block.content}
            onChange={value => updateBlock(block.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlerErr={err} />
      </div>
    </Resizable>
  )
}

export default CodeBlock
