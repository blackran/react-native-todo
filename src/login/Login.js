import React, { Component } from 'react'
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Dimensions,
    Alert
} from 'react-native'
import {
    Button,
    // Icon,
    Text
} from 'react-native-elements'

import DefaultStyles from '../statics/styles/DefaultStyles'
import { connect } from 'react-redux'
import Move from '../animation/Move'
import AnimationLogin from '../animation/AnimationLogin'
import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { height, width } = Dimensions.get('window')

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pseudo: 'blackran',
            pass: 'iloveyou',
            loading: false,
            error: false,
            delais: 100,
            isLogin: true
        }
    }

    OnChangeLogin (e) {
        this.setState({ pseudo: e })
    }

    OnChangePass (e) {
        this.setState({ pass: e })
    }

    OnSubmit = () => {
        // this.props.navigation.navigate('Principal',
        //     {
        //         user: 'blackran',
        //         color: this.props.color
        //     }
        // )
        AsyncStorage.getItem('todoNante').then(data => {
            if (data !== null) {
                this.setState({ loading: true })
                console.log(data)
                const isValid = JSON.parse(data).users.filter(e => {
                    return (e.pseudoUtilisateur === this.state.pseudo &&
                    e.passwordUtilisateur === this.state.pass)
                })
                if (isValid.length > 0) {
                    this.props.changeColor(JSON.parse(data).colors.filter(e => {
                        return isValid[0].pseudoUtilisateur === e.pseudoUtilisateur
                    })[0].name)
                    this.props.addUtilisateur(isValid[0])
                    this.props.putTasks(JSON.parse(data).tasks.filter(e => {
                        return e.pseudoUtilisateur === isValid[0].pseudoUtilisateur
                    })[0].data)
                    setTimeout(() => {
                        this.setState({
                            pseudo: '',
                            pass: ''
                        })
                        this.props.navigation.navigate('Principal',
                            {
                                user: isValid[0].pseudoUtilisateur,
                                color: this.props.color
                            }
                        )
                        this.setState({
                            loading: false,
                            error: false
                        })
                    }, 2000)
                } else {
                    this.setState({
                        loading: false,
                        error: true
                    })
                }
            }
        }).catch(e => {
            return Alert.alert(e)
        })
        return null
    }

    OnClickSign () {
        this.setState({ isLogin: !this.state.isLogin })
        // this.props.navigation.navigate('Sign')
        return null
    }

    render () {
        const { color } = this.props
        return (
            <KeyboardAwareScrollView>
                <AnimationLogin
                    delais={2000}
                    xD={0} yD={-200}
                    styles={{
                        backgroundColor: color.primary.light
                    }}
                    isLogin={this.state.isLogin}
                    headerBackgroundColor={'white'}
                    backgroundColor={'green'}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 12,
                                color: 'red',
                                textAlign: 'center'
                            }}>
                            {this.state.error ? 'pseudo ou password incorrect' : ''}
                        </Text>
                        <Move delais={40} xD={0} yD={-width}>
                            <TextInput
                                placeholder='Anarana'
                                onChangeText={this.OnChangeLogin.bind(this)}
                                style={{
                                    ...DefaultStyles.textinput,
                                    backgroundColor: '#fff',
                                    color: color.fontColor.default
                                }}
                                value={this.state.pseudo}
                            />
                        </Move>
                        <Move delais={40} xD={0} yD={width}>
                            <TextInput
                                placeholder='Famantarana'
                                onChangeText={this.OnChangePass.bind(this)}
                                value={this.state.pass}
                                style={{
                                    ...DefaultStyles.textinput,
                                    backgroundColor: '#fff',
                                    color: color.fontColor.default
                                }}
                                secureTextEntry={true}
                                onSubmitEditing={() => this.OnSubmit()}
                            />
                        </Move>

                        <Move delais={80} xD={0} yD={height}>
                            <Button
                                loading={this.state.loading}
                                buttonStyle={{
                                    ...DefaultStyles.buttonReactNativeElement,
                                    backgroundColor: color.primary.dark
                                }}
                                onPress={this.OnSubmit.bind(this)}
                                title={this.state.isLogin ? ' HIDITRA' : 'TAHIRIZO'}
                            />
                        </Move>
                        <Move delais={300} xD={0} yD={height}>
                            <TouchableWithoutFeedback
                                onPress={this.OnClickSign.bind(this)}
                            >
                                <View style={{ padding: 10 }}>
                                    <Text
                                        style={{
                                            color: color.primary.default,
                                            fontSize: 0.05 * width,
                                            textAlign: 'center'
                                        }}>
                                        {
                                            this.state.isLogin ? 'Mbola tsy manana' : 'Efa manana'
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Move>
                    </View>
                </AnimationLogin>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        utilisateur: state.Utilisateur,
        other: state.Other,
        color: state.Color
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTasks: (data) => {
            dispatch({
                type: 'ADD_TASKS',
                data
            })
        },
        addUtilisateur: (data) => {
            dispatch({
                type: 'ADD_UTILISATEUR',
                data
            })
        },
        changeShowEdit: (data) => {
            dispatch({
                type: 'CHANGE_SHOW_EDIT',
                data
            })
        },
        changeColor: (data) => {
            dispatch({
                type: 'CHANGE_COLOR',
                data
            })
        },
        putTasks: (data) => {
            dispatch({ type: 'PUT_TASKS', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
