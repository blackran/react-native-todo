import React, { useState, useEffect, useCallback } from 'react'
import { TextInput, View, Image, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import marcus from '../../statics/images/watch-dogs-2-wallpapers-pc-game.jpg'
import DefaultStyles from '../../statics/styles/DefaultStyles'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  faCamera,
  faKey,
  faUser,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import ImagePicker from 'react-native-image-picker'
import { useSelector, useDispatch } from 'react-redux'

function Users (props) {
  const dispatch = useDispatch()
  const { color, utilisateur } = useSelector(state => ({ other: state.Other, task: state.Tasks, color: state.Color, utilisateur: state.Utilisateur.connecterUtilisateur }))
  const [state, setStateTrue] = useState({
    pseudo: 'blackran',
    pass: 'password',
    passF: 'password',
    loading: false,
    error: false,
    delais: 100,
    isLogin: true,
    isShow: false,
    isShowF: false,
    photo: null
  })

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
  }, []) // eslint-disable-line

  const OnChangeLogin = (e) => {
    setState({ pseudo: e })
    dispatch({ type: 'PUT_COLOR_USER', data: { lastPseudoUtilisateur: utilisateur.pseudoUtilisateur, pseudoUtilisateur: e } })
    dispatch({ type: 'PUT_TASKS_USER', data: { lastPseudoUtilisateur: utilisateur.pseudoUtilisateur, pseudoUtilisateur: e } })
    dispatch({ type: 'PUT_UTILISATEUR', data: { ...utilisateur, pseudoUtilisateur: e } })
  }

  const isPassEqualPassF = () => {
    if (state.pass === state.passF) {
      dispatch({ type: 'PUT_UTILISATEUR', data: { ...utilisateur, passwordUtilisateur: state.pass } })
    }
  }

  const OnChangePass = (e) => {
    setState({ pass: e })
    isPassEqualPassF()
  }

  const OnChangePassF = (e) => {
    setState({ passF: e })
    isPassEqualPassF()
  }

  useEffect(() => {
    setState({
      photo: utilisateur.imageUtilisateur,
      pseudo: utilisateur.pseudoUtilisateur,
      pass: utilisateur.passwordUtilisateur,
      passF: utilisateur.passwordUtilisateur
    })
  }, [setState, utilisateur.imageUtilisateur, utilisateur.passwordUtilisateur, utilisateur.pseudoUtilisateur])

  const handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setState({ photo: response.uri })
        dispatch({ type: 'PUT_UTILISATEUR', data: { ...utilisateur, imageUtilisateur: response.uri } })
      }
    })
  }

  return (
    <View>
      <View
        style={{
          backgroundColor: '#0c0c0c',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          height: 60
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Principal', { color: color })}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: color.activeColor.primary.dark,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10
          }}
        >
          <Icon
            name='chevron-left'
            size={20}
            type='MaterialIcons'
            color='white'
          />
        </TouchableOpacity>

      </View>

      <KeyboardAwareScrollView
        onKeyboardWillShow={(frames) => {
          console.log('Keyboard event', frames)
        }}
      >

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <View
            style={{
              width: 200,
              height: 200,
              overflow: 'hidden',
              borderRadius: 10
            }}
          >
            {
              state.photo
                ? <Image
                  source={{ uri: state.photo }}
                  style={{
                    width: 200,
                    height: 200
                  }}
                />
                : <Image
                  source={marcus}
                  style={{
                    width: 200,
                    height: 200
                  }}
                />
            }
            <TouchableOpacity
              onPress={handleChoosePhoto}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: color.activeColor.primary.dark,
                backgroundColor: '#000000',
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 5,
                left: 5
              }}
            >
              <FontAwesomeIcon
                icon={faCamera}
                color={color.activeColor.fontColor.light}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{ marginTop: 20 }}
          >
            <View>
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
            </View>
            <View>
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
            </View>

            <View>
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
                onSubmitEditing={() => console.log('test')}
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
            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Users
