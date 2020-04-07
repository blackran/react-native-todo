/**
 * @format
 */

import 'react-native-gesture-handler'
import { AppRegistry, View } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'
import store from './store'
import React from 'react'

class AppWithStore extends React.Component {
    render () {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <App />
                </View>
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => AppWithStore)
