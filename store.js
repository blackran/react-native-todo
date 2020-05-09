import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const middleware = [thunk]
const initState = {}
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware(...middleware)
    )
)

export default store
