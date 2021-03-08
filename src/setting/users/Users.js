import React, { useState } from 'react'
import { TextInput, View, Image, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import marcus from '../../statics/images/watch-dogs-2-wallpapers-pc-game.jpg'
import DefaultStyles from '../../statics/styles/DefaultStyles'

import {
  faCamera,
  faKey,
  faUser,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

function Users (props) {
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

  const color = useSelector(state => state.Color)
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
        <Button
          icon={
            <Icon
              name='chevron-left'
              size={20}
              type='MaterialIcons'
              color='white'
            />
          }
          onPress={() => props.navigation.navigate('Principal', { color: color })}
          buttonStyle={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: color.activeColor.primary.dark,
            marginLeft: 10
          }}
          titleStyle={{
            color: color.activeColor.fontColor.light
          }}
          type='clear'
        />
      </View>

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
          <Image
            source={marcus}
            style={{
              width: 200,
              height: 200
            }}
          />
          <TouchableOpacity
            onPress={() => console.log('change image')}
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
    </View>
  )
}

export default Users
