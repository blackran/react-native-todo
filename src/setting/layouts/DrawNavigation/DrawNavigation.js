import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
// import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
// import { createStackNavigator   } from 'react-navigation-stack';
// import Home from './components/Home/Home'
// import Atouts from './components/Atouts/Atouts'
// import Help from './components/Help/Help'
import me from '../../../statics/images/login-image.jpg'
import { View, StyleSheet, Dimensions, Image, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import { faArrowLeft, faHome, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Move from '../../../animation/Move'
import Setting from '../tasks/Tasks'

// const AuthStack = createStackNavigator({
//     LoginScreen: Atouts
// });
import { connect } from 'react-redux'

const AppStack = createDrawerNavigator({
    SettingScreen: {
        screen: Setting,
        navigationOptions: {
            drawerLabel: 'Setting',
            drawerIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faSignOutAlt} color={tintColor} size={24}/>
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
    contentComponent: (props) => {
        const { color } = props.navigation.state.params
        return <View
            style={{
                flex: 1,
                // backgroundColor: props.navigation.state.params.color.primary.default
                backgroundColor: color !== undefined ? color.primary.default : '#0a896b'
            }}
        >
            <Text style={{
                textAlign: 'right',
                margin: 5
            }}>
                <FontAwesomeIcon icon={faArrowLeft} color='#888' size={30}
                    onPress={() => props.navigation.closeDrawer()}/>
            </Text>
            <View style={{
                height: 150,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image source={me} style={{
                    height: 120,
                    width: 120,
                    borderRadius: 120
                }}></Image>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: 30
                }}
            >
                {/* <DrawerItems {...props} /> */}
                <View>
                    <Move delais={100} xD={-100} yD={0}>
                        <Text style={{
                            margin: 16,
                            fontWeight: 'bold',
                            color: color !== undefined ? color.fontColor.light : '#ffb21d'
                        }}>Nom: Blackran</Text>
                    </Move>
                    <Move delais={200} xD={-200} yD={0}>
                        <Text style={{
                            margin: 16,
                            fontWeight: 'bold',
                            color: color !== undefined ? color.fontColor.light : '#ffb21d'
                        }}>Password: password</Text>
                    </Move>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                        // Alert.alert(
                        //     'Deconection',
                        //     'Voulez-vous vous déconnecter?',
                        //     [
                        //         { text: 'Annuler', onPress: () => { return null } },
                        //         {
                        //             text: 'Confirm',
                        //             onPress: () => {
                            props.navigation.closeDrawer()
                            props.navigation.navigate('Setting')
                        // }
                        // }
                        // ],
                        // cancelable: false }
                        // )
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <FontAwesomeIcon icon={faCog} color={ color !== undefined ? color.fontColor.light : '#ffb21d' } size={24}/>
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color !== undefined ? color.fontColor.light : '#ffb21d'
                            }}>Configuration</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        Alert.alert(
                            'Deconection',
                            'Voulez-vous vous déconnecter?',
                            [
                                {
                                    text: 'Annuler',
                                    onPress: () => {
                                        return null
                                    }
                                },
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        props.navigation.navigate('Login')
                                    }
                                }
                            ],
                            { cancelable: false }
                        )
                    }>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <FontAwesomeIcon icon={faSignOutAlt} color={ color !== undefined ? color.fontColor.light : '#ffb21d' } size={24}/>
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color !== undefined ? color.fontColor.light : '#ffb21d'
                            }}>Deconection</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
})

const DrawNavigation = createSwitchNavigator(
    {
        // Auth: AuthStack,
        App: AppStack
    }
)

function mapStateToProps (state) {
    return { color: state.Color }
}

export default createAppContainer(connect(mapStateToProps)(DrawNavigation))
