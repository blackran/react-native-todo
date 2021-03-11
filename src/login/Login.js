import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faKey,
  faUser,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'
// import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

const { height, width } = Dimensions.get('window')

function Login (props) {
  const dispatch = useDispatch()
  const { color, utilisateur, alert, tasks } = useSelector(state => {
    return { color: state.Color, utilisateur: state.Utilisateur, tasks: state.Tasks, alert: state.Alert }
  })

  const [state, setStateTrue] = useState({
    pseudo: 'blackran',
    pass: 'password',
    passF: 'password',
    loading: false,
    error: false,
    delais: 100,
    isLogin: true,
    isShow: false,
    isShowF: false
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

  const OnChangePassF = (e) => {
    setState({ passF: e })
  }

  // React.useEffect(() => {
  //   AsyncStorage
  //     .getAllKeys((err, keys) => {
  //       AsyncStorage.multiRemove(keys)
  //     })
  //     .then(() => console.log('finis'))
  // }, [])

  React.useEffect(() => {
    dispatch({
      type: 'CHANGE_COLOR',
      data: 'gray'
    })
  }, [dispatch])

  const OnSubmit = () => {
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

      if (!state.isLogin && state.pass === state.passF) {
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
            passwordUtilisateur: state.pass
          }
        })
        dispatch({
          type: 'ADD_DATA_ALERT',
          data: {
            pseudoUtilisateur: state.pseudo,
            data:
              {
                idAlert: new Date().getTime(),
                dureeAlert: 10,
                vibreurAlert: true,
                songUrl: '/',
                dureeVibreurAlert: 5
              }
          }
        })
        const dat = {
          pseudoUtilisateur: state.pseudo,
          data: [
            // Alahady: [],
            // Alatsinainy: [],
            // Talata: [],
            // Alarobia: [],
            // Alakamisy: [],
            // Zoma: [],
            // Sabotsy: []
          ]
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
          dispatch({ type: 'INIT_DATA_TASKS', data: dat.data })
        }

        const datAlert = alert.dataAlerts && alert.dataAlerts.find(e => {
          return e.pseudoUtilisateur === isValid.pseudoUtilisateur
        })

        if (datAlert) {
          dispatch({ type: 'INIT_DATA_ALERT', data: datAlert.data })
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
    return null
  }

  const OnClickSign = () => {
    setState({ isLogin: !state.isLogin, error: false })
    return null
  }

  return (
    <KeyboardAwareScrollView>
      <AnimationLogin
        styles={{
          backgroundColor: color.activeColor.primary.light
        }}
        isLogin={state.isLogin}
        headerBackgroundColor='white'
        backgroundColor={color.activeColor.primary.light}
      >
        <Spinner
          visible={state.loading}
          textContent='Miandry...'
          textStyle={{ color: '#FFF' }}
        />
        <View>
          <Text
            style={{
              fontSize: 12,
              color: 'red',
              textAlign: 'center'
            }}
          >
            {state.error ? 'pseudo ou password incorrect' : ''}
          </Text>
          <Move delais={1000} xD={-width} yD={0} change={state.isLogin}>
            <FontAwesomeIcon
              icon={faUser}
              color='black'
              size={20}
              style={{ position: 'absolute', top: 15, left: 18 }}
            />
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
          <Move delais={1000} xD={width / 2} yD={0} change={state.isLogin}>
            <FontAwesomeIcon
              icon={faKey}
              color='black'
              size={20}
              style={{ position: 'absolute', top: 15, left: 18 }}
            />
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
              secureTextEntry={!state.isShow}
              onSubmitEditing={() => OnSubmit()}
            />
            <TouchableOpacity
              onPress={() => setState({ isShow: !state.isShow })}
              style={{ position: 'absolute', right: 20, top: 10 }}
            >
              <FontAwesomeIcon
                icon={state.isShow ? faEye : faEyeSlash}
                color='black'
                size={30}
              />
            </TouchableOpacity>
          </Move>
          {!state.isLogin &&
            <Move delais={1000} xD={width / 2} yD={0} change={state.isLogin}>
              <FontAwesomeIcon
                icon={faKey}
                color='black'
                size={20}
                style={{ position: 'absolute', top: 15, left: 18 }}
              />
              <TextInput
                placeholder='Fanamarinana'
                onChangeText={OnChangePassF}
                value={state.passF}
                style={{
                  ...DefaultStyles.textinput,
                  // backgroundColor: color.activeColor.primary.default,
                  color: color.activeColor.fontColor.dark,
                  borderColor: color.activeColor.fontColor.dark
                }}
                secureTextEntry={!state.isShowF}
                onSubmitEditing={() => OnSubmit()}
              />
              <TouchableOpacity
                onPress={() => setState({ isShowF: !state.isShowF })}
                style={{ position: 'absolute', right: 20, top: 10 }}
              >
                <FontAwesomeIcon
                  icon={state.isShowF ? faEye : faEyeSlash}
                  color='black'
                  size={30}
                />
              </TouchableOpacity>
            </Move>}

          <Move delais={1000} xD={0} yD={height / 2} change={state.isLogin}>
            <Button
              buttonStyle={{
                ...DefaultStyles.buttonReactNativeElement,
                backgroundColor: color.activeColor.primary.dark

              }}
              onPress={() => OnSubmit()}
              title={state.isLogin ? ' HIDITRA' : 'TAHIRIZO'}
            />
          </Move>
          <Move delais={2000} xD={0} yD={height / 2} change={state.isLogin}>
            <TouchableWithoutFeedback
              onPress={() => OnClickSign()}
            >
              <View style={{ padding: 10 }}>
                <Text
                  style={{
                    color: color.activeColor.primary.dark,
                    fontSize: 0.05 * width,
                    textAlign: 'center'
                  }}
                >
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
