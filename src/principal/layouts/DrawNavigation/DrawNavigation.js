import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
// import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import me from '../../../statics/images/login-image.jpg'
import { View, Dimensions, Image, Text, TouchableOpacity, Alert } from 'react-native'
import { faArrowLeft, faHome, faSignOutAlt, faCog, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Principals from '../../Principals'
import Move from '../../../animation/Move'
import Setting from '../../../setting/Setting'

import { connect } from 'react-redux'

const AppStack1 = createDrawerNavigator({
    HomeScreen: {
        screen: Principals,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <FontAwesomeIcon icon={faHome} color={tintColor} size={24}/>
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
                backgroundColor: color ? color.activeColor.primary.default : 'white'
            }}
        >
            <View style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderColor: color ? color.activeColor.primary.dark : 'white',
                marginBottom: 20
            }}>
                <Image source={me} style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100
                }}></Image>
                <Move delais={100} xD={-100} yD={0}>
                    <Text style={{
                        margin: 16,
                        fontWeight: 'bold',
                        color: color ? color.activeColor.fontColor.light : '#ffb21d'
                    }}>Blackran</Text>
                </Move>
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
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.closeDrawer()
                            props.navigation.navigate('Principal',
                                {
                                    color: color
                                }

                            )
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <FontAwesomeIcon
                                icon={faTasks}
                                color={
                                    color ? color.activeColor.fontColor.light : '#ffb21d'
                                }
                                size={24}
                            />
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color ? color.activeColor.fontColor.light : '#ffb21d'
                            }}>Tasks</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.closeDrawer()
                            props.navigation.navigate('Setting',
                                {
                                    color: color
                                }
                            )
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <FontAwesomeIcon
                                icon={faCog}
                                color={ color ? color.activeColor.fontColor.light : '#ffb21d' }
                                size={24}
                            />
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color ? color.activeColor.fontColor.light : '#ffb21d'
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
                            <FontAwesomeIcon
                                icon={faSignOutAlt} color={ color ? color.activeColor.fontColor.light : '#ffb21d' } size={24}/>
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color ? color.activeColor.fontColor.light : '#ffb21d'
                            }}>Deconection</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
})

const AppStack2 = createDrawerNavigator({
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
                backgroundColor: color ? color.activeColor.primary.default : '#0a896b'
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
                            color: color ? color.activeColor.fontColor.light : '#ffb21d'
                        }}>Nom: Blackran</Text>
                    </Move>
                    <Move delais={200} xD={-200} yD={0}>
                        <Text style={{
                            margin: 16,
                            fontWeight: 'bold',
                            color: color ? color.activeColor.fontColor.light : '#ffb21d'
                        }}>Password: password</Text>
                    </Move>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            // props.navigation.closeDrawer()
                            props.navigation.actions.navigate('Principal')
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <FontAwesomeIcon
                                icon={faTasks}
                                color={
                                    color ? color.activeColor.fontColor.light : '#ffb21d'
                                }
                                size={24}
                            />
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color ? color.activeColor.fontColor.light : '#ffb21d'
                            }}>Tasks</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.closeDrawer()
                            props.navigation.navigate('Setting')
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 20
                        }}>
                            <FontAwesomeIcon icon={faCog} color={ color ? color.activeColor.fontColor.light : '#ffb21d' } size={24}/>
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color ? color.activeColor.fontColor.light : '#ffb21d'
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
                            <FontAwesomeIcon icon={faSignOutAlt} color={ color ? color.activeColor.fontColor.light : '#ffb21d' } size={24}/>
                            <Text style={{
                                margin: 16,
                                fontWeight: 'bold',
                                color: color ? color.activeColor.fontColor.light : '#ffb21d'
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
        Principal: AppStack1,
        Setting: AppStack2
    }
)

function mapStateToProps (state) {
    return { color: state.Color }
}

export default createAppContainer(connect(mapStateToProps)(DrawNavigation))
