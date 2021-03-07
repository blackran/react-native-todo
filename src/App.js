import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Principal from './DrawNavigation/DrawNavigation'
import Login from './login/Login'
import Notification from './principal/layouts/notification/Notification'
import Tasks from './setting/tasks/Tasks'
import Songs from './setting/songs/Songs'
import Users from './setting/users/Users'
import './NotificationManager'

const RootStack = createStackNavigator({
  Login: { screen: Login },
  Principal: { screen: Principal },
  Notification: { screen: Notification },
  Tasks: { screen: Tasks },
  Songs: { screen: Songs },
  Users: { screen: Users }
},
{
  initialRouteName: 'Login',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})

export default createAppContainer(RootStack)
