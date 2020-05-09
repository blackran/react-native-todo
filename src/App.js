import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Principal from './principal/layouts/DrawNavigation/DrawNavigation'
import Login from './login/Login'
import Details from './principal/layouts/details/Details'
import Loading from './loading/Loading'
import Notification from './principal/layouts/notification/Notification'
// import Example from './principal/Example'

const RootStack = createStackNavigator({
    Loading: { screen: Loading },
    Login: { screen: Login },
    Principal: { screen: Principal },
    Details: { screen: Details },
    Notification: { screen: Notification }
},
{
    initialRouteName: 'Principal',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
}
)

export default createAppContainer(RootStack)
