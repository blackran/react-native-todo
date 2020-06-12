import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Principal from './principal/layouts/DrawNavigation/DrawNavigation'
import Login from './login/Login'
import Notification from './principal/layouts/notification/Notification'
import Setting from './setting/Setting'

const RootStack = createStackNavigator({
    Login: { screen: Login },
    Principal: { screen: Principal },
    Notification: { screen: Notification },
    Setting: { screen: Setting }
},
{
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
}
)

export default createAppContainer(RootStack)
