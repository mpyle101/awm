import 'semantic-ui-css/semantic.min.css'
import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { Provider } from 'react-redux'

import App from './components/App'

import epics from './epics'
import reducers from './reducers'

const middleware = createEpicMiddleware()
const store = createStore(reducers, applyMiddleware(middleware))
middleware.run(epics)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
)