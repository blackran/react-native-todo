import React, { useState, useEffect, useCallback } from 'react'
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
import Loading from '../animation/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-ionicons'

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

  const [isFinish, setIsFinish] = useState(false)

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
  }, []) // eslint-disable-line

  const OnChangeLogin = (e) => {
    setState({ pseudo: e })
  }

  const OnChangePass = (e) => {
    setState({ pass: e })
  }

  const OnChangePassF = (e) => {
    setState({ passF: e })
  }

  useEffect(() => {
    // setState({
    //   pseudo: '',
    //   pass: '',
    //   passF: ''
    // })
  }, []) // eslint-disable-line

  useEffect(() => {
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
            pass: '',
            passF: ''
          })
          props.navigation.navigate('Principal',
            {
              user: isValid,
              color: color
            }
          )
          return setState({
            loading: false,
            error: false
          })
        }, 2000)
      }

      if (state.isLogin) {
        if (!(isValid && (isValid.passwordUtilisateur === state.pass))) {
          return setState({
            loading: false,
            error: true
          })
        }

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
          return setState({
            loading: false,
            error: false
          })
        }, 2000)
      }
    }
    return null
  }

  const OnClickSign = () => {
    setIsFinish(true)
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
        <View>
          <Text
            style={{
              color: 'red',
              fontSize: 12,
              textAlign: 'center'
            }}
          >
            {state.error ? 'pseudo ou password incorrect' : ''}
          </Text>
          <Move delais={1000} xD={-width} yD={0} change={state.isLogin}>
            <Icon
              name='person'
              color='black'
              size={25}
              style={{ position: 'absolute', top: 12, left: 18 }}
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
            <Icon
              name='key'
              color='black'
              size={25}
              style={{ position: 'absolute', top: 12, left: 18 }}
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
              <Icon
                name={state.isShow ? 'eye' : 'eye-off'}
                color='black'
                size={30}
              />
            </TouchableOpacity>
          </Move>
          {(!state.isLogin || isFinish) &&
            <Move
              delais={1000}
              xD={width / 2}
              yD={0}
              fama
              isFinish={() => {
                setIsFinish(false)
              }}
              change={state.isLogin}
            >
              <Icon
                name='key'
                color='black'
                size={25}
                style={{ position: 'absolute', top: 12, left: 18 }}
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
                <Icon
                  name={state.isShowF ? 'eye' : 'eye-off'}
                  color='black'
                  size={30}
                />
              </TouchableOpacity>
            </Move>}

          <Move delais={1000} xD={0} yD={height / 2} change={state.isLogin}>
            <Loading
              animation={state.loading}
              styles={{
                ...DefaultStyles.buttonReactNativeElement,
                backgroundColor: color.activeColor.primary.dark
              }}
            >
              <Button
                buttonStyle={{
                  ...DefaultStyles.buttonReactNativeElement,
                  backgroundColor: color.activeColor.primary.dark

                }}
                onPress={() => OnSubmit()}
                title={state.isLogin ? ' HIDITRA' : 'TAHIRIZO'}
              />
            </Loading>
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
