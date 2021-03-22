import React, { useState, useEffect, useRef } from 'react'
import { Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { Icon, Image, CheckBox, Slider } from 'react-native-elements'
import songImage from './statics/images/music.png'

import SoundPlayer from 'react-native-sound-player'
// import Sound from 'react-native-sound'
// import { faStopwatch, faMusic } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import IconIonic from 'react-native-ionicons'

import { useSelector, useDispatch } from 'react-redux'

const { width } = Dimensions.get('window')

// Sound.setCategory('Playback')

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

    // const whoosh = new Sound('imany.mp3', Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     console.log('failed to load the sound', error)
    //     return null
    //   }
    //
    //   // loaded successfully
    //   console.log('duration in seconds: ' + whoosh.getDuration() + ' number of channells: ' + whoosh.getNumberOfChannels())
    // })
    //
    // whoosh.play((success) => {
    //   console.log({ success })
    //   // if (success) {
    //   //   console.log('successfully finish playing')
    //   // } else {
    //   //   console.log('playback failed due to audio decoding errors')
    //   //
    //   //   // reset the player
    //   //   whoosh.reset()
    //   // }
    // })
    //
    // // whoosh.setVolume(0.5)
    //
    // whoosh.getCurrentTime((seconds) => console.log('at: ', seconds))
    //
    // // whoosh.stop(() => {
    // //   // whoosh.play()
    // // })
    //
    // whoosh.release()

    return () => SoundPlayer.unmount()
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

  const stock = useRef()

  const [play, setPlay] = useState(false)
  const [curent, setCurent] = useState({
    currentTime: 0,
    duration: 0
  })

  useEffect(() => {
    if (play) {
      stock.current = setInterval(() => {
        getInfo()
      }, 1000)
    }
    return () => clearInterval(stock.current)
  }, [play])

  const getInfo = async () => {
    try {
      const info = await SoundPlayer.getInfo()
      if (info) {
        setCurent(info)
      }
    } catch (e) {
      console.log('ther is no song playing', e)
    }
  }

  const runSong = (songUrl) => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile(songUrl, 'mp3')
      setPlay(true)
      SoundPlayer.onFinishedPlaying(() => {
        setPlay(false)
        setCurent({ currentTime: 0, duration: 0 })
      })
    } catch (e) {
      console.log('cannot play the sound file', e)
    }
  }

  const stopSong = () => {
    try {
      // play the file tone.mp3
      SoundPlayer.stop()
      setCurent({ currentTime: 0, duration: 0 })
      setPlay(false)
    } catch (e) {
      console.log('cannot play the sound file', e)
    }
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
            type='ionicons'
            color='white'
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={{ padding: 10, marginTop: 20 }}>
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
              onPress={(e) => {
                setIsVibreur(!isVibreur)
                if (isVibreur) {
                  setNameSong(alert.nameSong[0].name)
                } else {
                  setNameSong('')
                }
              }}
              checked={isVibreur}
              checkedColor={color.activeColor.fontColor.dark}
            />
          </View>
          <Text>Karazana hira</Text>
          <View style={{ marginBottom: 10 }}>
            {
            alert?.nameSong.map(e => {
              return (
                <View
                  key={e.indice}
                  style={{
                    borderWidth: 1,
                    borderColor: color.activeColor.fontColor.light,
                    borderRadius: 10,
                    margin: 2,
                    backgroundColor: 'white',
                    paddingTop: 10,
                    padding: 5,
                    paddingBottom: e.name === nameSong ? 0 : 10
                  }}
                >
                  <CheckBox
                    containerStyle={{
                      backgroundColor: 'transparent',
                      margin: 0,
                      padding: 0,
                      borderWidth: 0
                    }}
                    title={e.indice}
                    onPress={() => {
                      setIsVibreur(false)
                      setNameSong(e.name)
                    }}
                    checked={e.name === nameSong}
                    checkedColor={color.activeColor.fontColor.dark}
                  />

                  {e.name === nameSong &&
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10
                      }}
                    >
                      <Slider
                        value={curent.duration ? (curent.currentTime / curent.duration) : 0.01}
                        trackStyle={{
                          width: 180
                        // height: 10, backgroundColor: 'transparent'
                        }}
                        thumbStyle={{
                          height: 20,
                          width: 5,
                          backgroundColor: 'white',
                          borderWidth: 2
                        }}
                      />
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          onPress={() => runSong(e.name)}
                        >
                          <IconIonic
                            name='play'
                            color='black'
                            size={20}
                            style={{ padding: 10 }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => stopSong()}
                        >
                          <IconIonic
                            name='square'
                            color='black'
                            size={20}
                            style={{ padding: 10 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>}
                </View>
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
