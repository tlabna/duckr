import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from 'redux/modules'
import thunk from 'redux-thunk'
import restricted from 'helpers/restricted'

// create state tree from suplied reducers
const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f // start extension or return first argument
))

function checkAuth (component) {
  return restricted(component, store)
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
