import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Principal from './principal/DrawNavigation'
import Sign from './sign/Sign'
import Login from './login/Login'
import Details from './principal/layouts/details/Details'
import Loading from './loading/Loading'
// import Example from './principal/Example'

const RootStack = createStackNavigator({
    Loading: { screen: Loading },
    Sign: { screen: Sign },
    Login: { screen: Login },
    Principal: { screen: Principal },
    Details: { screen: Details }
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
