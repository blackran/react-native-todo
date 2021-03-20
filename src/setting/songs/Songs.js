import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { Icon, Image, CheckBox, Slider } from 'react-native-elements'
import songImage from './statics/images/music.png'
// import { faStopwatch, faMusic } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import IconIonic from 'react-native-ionicons'

import { useSelector, useDispatch } from 'react-redux'

const { width } = Dimensions.get('window')

function Songs (props) {
  const dispatch = useDispatch()
  const { alert, utilisateur, color } = useSelector(state => ({
    color: state.Color,
    alert: state.Alert,
    utilisateur: state.Utilisateur.connecterUtilisateur
  }))

  const [isVibreur, setIsVibreur] = useState(false)
  const [duree, setDuree] = useState(0)
  const [vibreur, setVibreur] = useState(0)
  const [nameSong, setNameSong] = useState('')

  useEffect(() => {
    if (alert.dataAlert) {
      const { dureeAlert, vibreurAlert, dureeVibreurAlert, songUrl } = alert.dataAlert
      setDuree(dureeAlert / 60)
      setVibreur(dureeVibreurAlert / 60)
      setIsVibreur(vibreurAlert)
      setNameSong(songUrl)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (vibreur && duree && utilisateur.pseudoUtilisateur) {
      setTimeout(() =>
        dispatch({
          type: 'ON_CHANGE_SLIDER',
          pseudoUtilisateur: utilisateur.pseudoUtilisateur,
          vibreur: vibreur,
          isVibreur: isVibreur,
          duree: duree,
          song: nameSong
        }), 10)
    }
  }, [vibreur, duree, nameSong, dispatch, isVibreur]) // eslint-disable-line

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
            type='ionicons'
            color='white'
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            width: width,
            height: (width * 2) / 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={songImage}
            style={{
              width: 128,
              height: 128
            }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
              // justifyContent: 'center'
            }}
          >
            <IconIonic
              name='stopwatch'
              color={color.activeColor.fontColor.dark}
              size={30}
            />

            <Slider
              onSlidingComplete={(e) => setDuree(e)}
              step={5 / 60}
              value={duree}
              trackStyle={{
                width: 200,
                marginLeft: 10,
                marginRight: 20
                // height: 10, backgroundColor: 'transparent'
              }}
              thumbStyle={{
                height: 30,
                width: 30,
                backgroundColor: 'white',
                borderWidth: 2,
                marginLeft: 10,
                borderRadius: 30
              }}
            />

            <Text
              style={{
                textAlign: 'center',
                height: 20,
                fontSize: 15
              }}
            > {((duree * 60) + '').split('.')[0]} Min
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <IconIonic
              name='musical-notes'
              color={color.activeColor.fontColor.dark}
              size={30}
            />
            <Slider
              onSlidingComplete={(e) => {
                // setVibreur(Math.round(e * 10) / 10)
                setVibreur(e)
              }}
              value={vibreur}
              trackStyle={{
                width: 200,
                marginLeft: 10,
                marginRight: 20
                // height: 10, backgroundColor: 'transparent'
              }}
              step={5 / 60}
              thumbStyle={{
                height: 30,
                width: 30,
                backgroundColor: 'white',
                borderWidth: 2,
                marginLeft: 10,
                borderRadius: 30
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                height: 20,
                fontSize: 15
              }}
            > {((vibreur * 60) + '').split('.')[0]} Sec
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <CheckBox
              containerStyle={{ paddingLeft: 0, marginLeft: 0, backgroundColor: 'transparent' }}
              title='Vibreur'
              onPress={(e) => setIsVibreur(!isVibreur)}
              checked={isVibreur}
              checkedColor={color.activeColor.fontColor.dark}
            />
          </View>
          <Text>Karazana hira</Text>
          <View style={{ marginBottom: 10 }}>
            {
            alert?.nameSong.map(e => {
              return (
                <CheckBox
                  containerStyle={{
                    backgroundColor: 'transparent',
                    marginBottom: 0
                  }}
                  key={e.indice}
                  title={e.indice}
                  onPress={() => setNameSong(e.name)}
                  checked={!isVibreur && e.name === nameSong}
                  disabled={isVibreur}
                  checkedColor={color.activeColor.fontColor.dark}
                />
              )
            })
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Songs
