import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
// import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Dimensions } from 'react-native'
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Principals from '../principal/Principals'
import Songs from '../setting/songs/Songs'
import Tasks from '../setting/tasks/Tasks'
import ContentDrawer from './ContentDrawer'

const AppStackPrincipal = createDrawerNavigator({
  HomeScreen: {
    screen: Principals,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <FontAwesomeIcon icon={faHome} color={tintColor} size={24} />
      )
    }
  }
},
{
  // initialRouteName: 'Auth',
  contentOptions: {
    activeTintColor: '#ffb21d',
    inactiveTintColor: '#ffb21d',
    // inactiveTintColor: '#888',
    itemsContainerStyle: {
      marginVertical: 0
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  drawerBackgroundColor: '#01001a',
  drawerWidth: Dimensions.get('window').width - 130,
  contentComponent: ({ navigation }) => <ContentDrawer navigation={navigation} />
})

const AppStackTasks = createDrawerNavigator({
  SettingScreen: {
    screen: Tasks,
    navigationOptions: {
      drawerLabel: 'Tasks',
      drawerIcon: ({ tintColor }) => (
        <FontAwesomeIcon icon={faSignOutAlt} color={tintColor} size={24} />
      )
    }
  }
},
{
  // initialRouteName: 'Auth',
  contentOptions: {
    activeTintColor: '#ffb21d',
    inactiveTintColor: '#ffb21d',
    // inactiveTintColor: '#888',
    itemsContainerStyle: {
      marginVertical: 0
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  drawerBackgroundColor: '#01001a',
  drawerWidth: Dimensions.get('window').width - 130,
  contentComponent: ({ navigation }) => <ContentDrawer navigation={navigation} />
})

const AppStackSongs = createDrawerNavigator({
  SettingScreen: {
    screen: Songs,
    navigationOptions: {
      drawerLabel: 'Songs',
      drawerIcon: ({ tintColor }) => (
        <FontAwesomeIcon icon={faSignOutAlt} color={tintColor} size={24} />
      )
    }
  }
},
{
  // initialRouteName: 'Auth',
  contentOptions: {
    activeTintColor: '#ffb21d',
    inactiveTintColor: '#ffb21d',
    // inactiveTintColor: '#888',
    itemsContainerStyle: {
      marginVertical: 0
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  drawerBackgroundColor: '#01001a',
  drawerWidth: Dimensions.get('window').width - 130,
  contentComponent: ({ navigation }) => <ContentDrawer navigation={navigation} />
})

const DrawNavigation = createSwitchNavigator(
  {
    Principal: AppStackPrincipal,
    Songs: AppStackSongs,
    Tasks: AppStackTasks
  }
)

export default createAppContainer(DrawNavigation)
