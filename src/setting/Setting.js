import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser as faUserS, faUserCircle as faUserCircleS } from '@fortawesome/free-solid-svg-icons'
import { faUser as faUserR, faUserCircle as faUserCircleR } from '@fortawesome/free-regular-svg-icons'
// import { faUser as faUserBrands, faTasks } from '@fortawesome/free-brands-svg-icons'
import Tasks from './layouts/tasks/Tasks'
import Users from './layouts/users/Users'

const MainNavigator = createMaterialTopTabNavigator({
    Tasks: {
        screen: Tasks,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesomeIcon icon={focused ? faUserS : faUserR } color={tintColor} size={24}/>
            )
        }
    },
    Users: {
        screen: Users,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => (
                <FontAwesomeIcon icon={focused ? faUserCircleS : faUserCircleR} color={tintColor} size={24}/>
            )
        }
    }
},
{
    initialRouteName: 'Tasks',
    order: ['Tasks', 'Users'],
    tabBarPosition: 'bottom',

    // barStyle: { backgroundColor: '#bbb' },
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: '#006c99',
        inactiveTintColor: '#999',
        labelStyle: {
            fontSize: 15
        },
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        style: {
            backgroundColor: 'gray',
            borderTopWidth: 1,
            borderTopColor: '#bbb',
            // position: 'absolute',
            // left: 0,
            // right: 0,
            // bottom: 0
        }
    }
}
)

const Setting = createAppContainer(MainNavigator)

export default Setting
