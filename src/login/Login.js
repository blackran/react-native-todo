import React, { Component } from 'react'
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Dimensions
} from 'react-native'
import {
    Button,
    // Icon,
    Image,
    Text
} from 'react-native-elements'

import DefaultStyles from '../statics/styles/DefaultStyles'
import styles from './statics/styles/Styles'
// import logo from '../statics/images/logo-universite-fianarantsoa.png'
import { connect } from 'react-redux'
import axios from 'axios'
import Move from '../animation/Move'
import AnimationLogin from '../animation/AnimationLogin'
import AsyncStorage from '@react-native-community/async-storage'
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

    OnSubmit = async () => {
        this.setState({ loading: true })
        const isValid = this.props.utilisateur.dataUtilisateur.filter(e => {
            return (e.pseudoUtilisateur === this.state.pseudo &&
                e.passwordUtilisateur === this.state.pass)
        })

        if (isValid.length > 0) {
            this.setState({ loading: false, error: false })
            this.setState({ pseudo: '', pass: '' })
            var stock = await AsyncStorage.getItem('todoNante')
            if (stock !== null) {
                var trueData = await JSON.parse(JSON.parse(stock).utilisateur).filter(e => {
                    return isValid[0].pseudoUtilisateur === e.pseudoUtilisateur
                })

                this.props.initDataTasks(trueData)
            }
            // var init = {
            //     utilisateur: JSON.stringify([]),
            //     tasks: JSON.stringify([])
            // }
            // await AsyncStorage.setItem('todoNante', JSON.stringify(init))
            setTimeout(() => {
                this.props.navigation.navigate('Principal',
                    { user: isValid[0].pseudoUtilisateur }
                )
            }, 2000)
        } else {
            this.setState({ loading: false, error: true })
        }

        // this.setState({ error: false })
        // if (this.state.login !== '' && this.state.pass !== '') {
        //     this.setState({ loading: true })
        //     setTimeout(() => {
        //         // if(this.props.navigation)
        //         if (this.props.navigation.state.routeName === 'Login') {
        //             this.setState({ loading: false })
        //         }
        //     }, 10000)
        //     const stock = {
        //         login: this.state.login,
        //         pass: this.state.pass
        //     }
        //     axios.post(this.props.other.ip_add + 'Etudiant/getlogin', stock,
        //         {
        //             headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Access-Control-Allow-Methods': 'POST,GET,HEAD,OPTIONS,PUT,DELETE'
        //             }
        //         }
        //     ).then(h => {
        //         console.log(h.data)
        //         this.setState({ loading: false })
        //         if (h.data.length > 0) {
        //             this.props.navigation.navigate('Principal', { Etudiant: h.data[0] })
        //         } else {
        //             this.setState({ error: true })
        //         }
        //     }).catch(err => {
        //         console.log('error parsing:\n', err)
        //         this.setState({ error: true })
        //         this.setState({ loading: false })
        //     })
        // }
        return null
    }

    OnClickSign () {
        this.setState({ isLogin: !this.state.isLogin })
        // this.props.navigation.navigate('Sign')
        return null
    }

    render () {
        return (
            <AnimationLogin
                delais={2000}
                xD={0} yD={-200}
                styles={ styles.body }
                isLogin = { this.state.isLogin }
            >
                <View style={{
                    marginBottom: height / 3
                }}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'red',
                            textAlign: 'center'
                        }}>
                        { this.state.error ? 'pseudo ou password incorrect' : '' }
                    </Text>
                    <Move delais={100} xD={0} yD={-width}>
                        <TextInput
                            placeholder='Anarana'
                            onChangeText={this.OnChangeLogin.bind(this)}
                            style={DefaultStyles.textinput}
                            value={this.state.pseudo}
                        />
                    </Move>
                    <Move delais={100} xD={0} yD={width}>
                        <TextInput
                            placeholder='Famantarana'
                            onChangeText={this.OnChangePass.bind(this)}
                            style={DefaultStyles.textinput}
                            value={this.state.pass}
                            secureTextEntry={true}
                            onSubmitEditing={() => this.OnSubmit()}
                        />
                    </Move>

                    <Move delais={200} xD={0} yD={height}>
                        <Button
                            icon={
                                this.state.loading
                                    ? <ActivityIndicator color='white'/>
                                    : null
                            }
                            buttonStyle={DefaultStyles.buttonReactNativeElement}
                            onPress={this.OnSubmit.bind(this)}
                            title={
                                this.state.loading
                                    ? ''
                                    : (this.state.isLogin ? ' HIDITRA' : 'TAHIRIZO') }
                        />
                    </Move>
                    <Move delais={300} xD={0} yD={height}>
                        <TouchableWithoutFeedback
                            onPress={this.OnClickSign.bind(this)}
                        >
                            <View style={{ padding: 10 }}>
                                <Text
                                    style={{
                                        color: 'white',
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
        )
    }
}

const mapStateToProps = state => {
    return { utilisateur: state.Utilisateur, other: state.Other }
}

const mapDispatchToProps = dispatch => {
    return {
        addTasks: (data) => {
            dispatch({ type: 'ADD_TASKS', data })
        },
        initDataTasks: (data) => {
            dispatch({ type: 'INIT_DATA_TASKS', data })
        },
        changeShowEdit: (data) => {
            dispatch({ type: 'CHANGE_SHOW_EDIT', data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
