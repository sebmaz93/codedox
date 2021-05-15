import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import * as actionCreators from './action-creators'

import {persistMiddleware} from 'reduxState/middlewares/persistMiddleware'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
  }
}

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators
    })) ||
  compose

const enhancer = composeEnhancers(applyMiddleware(persistMiddleware, thunk))

export const store = createStore(reducers, {}, enhancer)
