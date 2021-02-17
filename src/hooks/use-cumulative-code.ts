import {useTypedSelector} from 'hooks/use-typed-selector'

export const useCumulativeCode = (blockId: string) => {
  return useTypedSelector(state => {
    const {data, order} = state.blocks
    const orderedBlocks = order.map(id => data[id])
    const showFn = `
    import _React from 'react'
    import _ReactDOM from 'react-dom'
    
    var show = value => {
      const root = document.getElementById('root')
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root)
        } else {
          root.innerHTML = JSON.stringify(value)
        }
      } else {
        root.innerHTML = value
      }
    }`
    const showFnNoop = 'var show = () => {}'
    const cumulativeCode = []
    for (let b of orderedBlocks) {
      if (b.kind === 'code') {
        if (b.id === blockId) {
          cumulativeCode.push(showFn)
        } else {
          cumulativeCode.push(showFnNoop)
        }
        cumulativeCode.push(b.content)
      }
      if (b.id === blockId) {
        break
      }
    }
    return cumulativeCode
  }).join('\n')
}
