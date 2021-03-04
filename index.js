/**
 * @format
 */

import 'react-native-gesture-handler'
import { AppRegistry, View } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'
import { store, persiste } from './redux/store'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

class AppWithStore extends React.Component {
  render () {
    return (
      <Provider store={store()}>
        <PersistGate loading={null} persistor={persiste()}>
          <View style={{ flex: 1 }}>
            {/* <StatusBar hidden={true}/> */}
            <App />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => AppWithStore)
