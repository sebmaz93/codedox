import {useActions} from 'hooks/use-actions'
import {useTypedSelector} from 'hooks/use-typed-selector'
import {useEffect, FC} from 'react'
import {Block} from 'reduxState'
import CodeEditor from 'components/editors/code-editor'
import Preview from 'components/preview/preview'
import Resizable from 'components/common/resizable'
import styled, {keyframes} from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const PreviewWrapperStyled = styled.div`
  height: 100%;
  flex-grow: 1;
  background-color: #fff;
`

const ProgressCoverStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
  animation: ${fadeIn} 500ms;
`

interface OwnProps {
  block: Block
}

const CodeBlock: FC<OwnProps> = ({block}) => {
  const {updateBlock, createBundle} = useActions()
  const bundle = useTypedSelector(state => state.bundles[block.id])
  const cumulativeCode = useTypedSelector(state => {
    const {data, order} = state.blocks
    const orderedBlocks = order.map(id => data[id])
    const cumulativeCode = []
    for (let b of orderedBlocks) {
      if (b.kind === 'code') {
        cumulativeCode.push(b.content)
      }
      if (b.id === block.id) {
        break
      }
    }
    return cumulativeCode
  })

  useEffect(() => {
    if (!bundle) {
      createBundle(block.id, cumulativeCode.join('\n'))
      return
    }
    const timer = setTimeout(async () => {
      createBundle(block.id, cumulativeCode.join('\n'))
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), block.id, createBundle])

  return (
    <Resizable direction="v">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Resizable direction="h">
          <CodeEditor
            initialValue={block.content}
            onChange={value => updateBlock(block.id, value)}
          />
        </Resizable>
        <PreviewWrapperStyled>
          {!bundle || bundle.loading ? (
            <ProgressCoverStyled>
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </ProgressCoverStyled>
          ) : (
            <Preview code={bundle.code} bundlerErr={bundle.err} />
          )}
        </PreviewWrapperStyled>
      </div>
    </Resizable>
  )
}

export default CodeBlock
