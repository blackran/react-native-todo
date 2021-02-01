import React, { useState } from 'react'
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native'
import {
    Button,
    // Icon,
    Text
} from 'react-native-elements'

import DefaultStyles from '../statics/styles/DefaultStyles'
import { useSelector, useDispatch } from 'react-redux'
import Move from '../animation/Move'
import AnimationLogin from '../animation/AnimationLogin'
// import AsyncStorage from '@react-native-community/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { height, width } = Dimensions.get('window')

function Login (props) {
    const dispatch = useDispatch()
    const { color, utilisateur, tasks } = useSelector(state => {
        return { color: state.Color, utilisateur: state.Utilisateur, tasks: state.Tasks }
    })

    const [state, setStateTrue] = useState({
        pseudo: 'blackran',
        pass: 'password',
        loading: false,
        error: false,
        delais: 100,
        isLogin: true
    })

    const setState = (data) => {
        setStateTrue(Object.assign({}, state, data))
    }

    const OnChangeLogin = (e) => {
        setState({ pseudo: e })
    }

    const OnChangePass = (e) => {
        setState({ pass: e })
    }

    React.useEffect(() => {
        dispatch({
            type: 'CHANGE_COLOR',
            data: 'gray'
        })
    }, [dispatch])

    const OnSubmit = () => {
        // props.navigation.navigate('Principal',
        //     {
        //         user: 'blackran',
        //         color
        //     }
        // )

        if (utilisateur) {
            setState({ loading: true })
            const isValid = utilisateur.dataUtilisateur.find(e => {
                return e.pseudoUtilisateur === state.pseudo
            })

            if (!state.isLogin && isValid) {
                return setState({
                    loading: false,
                    error: true
                })
            }

            if (!state.isLogin) {
                dispatch({
                    type: 'ADD_COLOR',
                    data: {
                        nameColor: 'gray',
                        pseudoUtilisateur: state.pseudo
                    }
                })
                dispatch({
                    type: 'ADD_UTILISATEUR',
                    data: {
                        pseudoUtilisateur: state.pseudo,
                        imageUtilisateur: '',
                        passwordUtilisateur: state.password
                    }
                })
                const dat = {
                    pseudoUtilisateur: state.pseudo,
                    data: {
                        Alahady: [],
                        Alatsinainy: [],
                        Talata: [],
                        Alarobia: [],
                        Alakamisy: [],
                        Zoma: [],
                        Sabotsy: []
                    }
                }

                if (dat) {
                    dispatch({ type: 'ADD_DATA_TASKS', data: dat })
                }

                setTimeout(() => {
                    setState({
                        pseudo: '',
                        pass: ''
                    })
                    props.navigation.navigate('Principal',
                        {
                            user: isValid,
                            color: color
                        }
                    )
                    setState({
                        loading: false,
                        error: false
                    })
                }, 2000)
            }

            if (isValid && (isValid.passwordUtilisateur === state.pass)) {
                dispatch({
                    type: 'CHANGE_COLOR',
                    data: color.dataColor.find(e => {
                        return isValid.pseudoUtilisateur === e.pseudoUtilisateur
                    }).nameColor
                })
                dispatch({
                    type: 'INIT_UTILISATEUR',
                    data: isValid
                })
                const dat = tasks.dataTasks && tasks.dataTasks.find(e => {
                    return e.pseudoUtilisateur === isValid.pseudoUtilisateur
                })

                if (dat) {
                    console.log(dat.data)
                    dispatch({ type: 'INIT_DATA_TASKS', data: dat.data })
                }

                setTimeout(() => {
                    setState({
                        pseudo: '',
                        pass: ''
                    })
                    props.navigation.navigate('Principal',
                        {
                            user: isValid,
                            color: color
                        }
                    )
                    setState({
                        loading: false,
                        error: false
                    })
                }, 2000)
            } else {
                setState({
                    loading: false,
                    error: true
                })
            }
        }
        // .catch(e => {
        //     return Alert.alert(e.message)
        // })
        return null
    }

    const OnClickSign = () => {
        setState({ isLogin: !state.isLogin })
        return null
    }

    return (
        <KeyboardAwareScrollView
            onKeyboardWillShow={(frames) => {
                console.log('Keyboard event', frames)
            }}
        >
            <AnimationLogin
                styles={{
                    backgroundColor: color.activeColor.primary.light
                }}
                isLogin={state.isLogin}
                headerBackgroundColor={'white'}
                backgroundColor={color.activeColor.primary.light}
            >
                <View>
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'red',
                            textAlign: 'center'
                        }}>
                        {state.error ? 'pseudo ou password incorrect' : ''}
                    </Text>
                    <Move delais={40} xD={0} yD={-width}>
                        <TextInput
                            placeholder='Anarana'
                            onChangeText={OnChangeLogin}
                            style={{
                                ...DefaultStyles.textinput,
                                // backgroundColor: color.activeColor.primary.default,
                                color: color.activeColor.fontColor.dark,
                                borderColor: color.activeColor.fontColor.dark
                            }}
                            value={state.pseudo}
                        />
                    </Move>
                    <Move delais={40} xD={0} yD={width}>
                        <TextInput
                            placeholder='Famantarana'
                            onChangeText={OnChangePass}
                            value={state.pass}
                            style={{
                                ...DefaultStyles.textinput,
                                // backgroundColor: color.activeColor.primary.default,
                                color: color.activeColor.fontColor.dark,
                                borderColor: color.activeColor.fontColor.dark
                            }}
                            secureTextEntry={true}
                            onSubmitEditing={() => OnSubmit()}
                        />
                    </Move>

                    <Move delais={80} xD={0} yD={height}>
                        <Button
                            loading={state.loading}
                            buttonStyle={{
                                ...DefaultStyles.buttonReactNativeElement,
                                backgroundColor: color.activeColor.primary.dark

                            }}
                            onPress={() => OnSubmit()}
                            title={state.isLogin ? ' HIDITRA' : 'TAHIRIZO'}
                        />
                    </Move>
                    <Move delais={300} xD={0} yD={height}>
                        <TouchableWithoutFeedback
                            onPress={() => OnClickSign()}
                        >
                            <View style={{ padding: 10 }}>
                                <Text
                                    style={{
                                        color: color.activeColor.primary.dark,
                                        fontSize: 0.05 * width,
                                        textAlign: 'center'
                                    }}>
                                    {
                                        state.isLogin ? 'Mbola tsy manana' : 'Efa manana'
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

export default Login
