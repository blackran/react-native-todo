import {
    createStore
    // applyMiddleware,
    // compose
} from 'redux'
import rootReducer from '.'
// import thunk from 'redux-thunk'

// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

const rootPersistConfig = {
    key: 'asako',
    storage: AsyncStorage
}

// const middleware = [thunk]
// const initState = {}

// const store = createStore(
//     rootReducer,
//     initState,
//     compose(
//         applyMiddleware(...middleware)
//     )
// )

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const storeStock = createStore(persistedReducer)

export const store = () => storeStock

export const persiste = () => persistStore(storeStock)
