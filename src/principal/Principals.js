import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Vibration,
  // FlatList,
  Animated
} from 'react-native'
import styles from './statics/styles/Style'
import { useDispatch, useSelector } from 'react-redux'
import Block from './layouts/block/Block'
import SoundPlayer from 'react-native-sound-player'

// import { useSafeAreaInsets } from 'react-native-safe-area-context'

// import { faBars } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Avatar } from 'react-native-elements'
// import userDefault from './statics/images/user.png'
import marcus from './statics/images/watch-dogs-2-wallpapers-pc-game.jpg'
import Icon from 'react-native-ionicons'
import JourLayout from './layouts/jours/Jours'

const { width } = Dimensions.get('window')

function useStateF (data) {
  const [state, setStateTrue] = useState(data)
  const setState = (data) => {
    setStateTrue((e) => Object.assign({}, e, data))
  } // eslint-disable-line

  return [state, setState]
}

const yD = new Animated.Value(0)
const AnimatedScrollViewJour = Animated.createAnimatedComponent(ScrollView)

function ScollDay ({ jours, height, OnEndScroll, setTopPostion }) {
  const listView = useRef()
  const onScrollD = Animated.event(
    [{ nativeEvent: { contentOffset: { y: yD } } }],
    {
      useNativeDriver: true
    }
  )
  return (
    <View
      style={{
        height: height * 3,
        width: 300,
        marginLeft: 10
      }}
    >
      <AnimatedScrollViewJour
        ref={listView}
        style={{
          ...styles.myscroll,
          height: height * 3,
          width: 190
        }}
        snapToInterval={height}
        scrollEventThrottle={16}
        onScroll={onScrollD}
        onMomentumScrollEnd={(e) => {
          OnEndScroll(e, listView)
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            height: height * (jours.length + 2),
            width: 190
          }}
        >
          <JourLayout
            jour=''
            i={0}
            yD={yD}
          />
          {
            jours.map((e, index) => {
              return (
                <JourLayout
                  jour={e}
                  i={index + 1}
                  yD={yD}
                  key={index + 1}
                />
              )
            })
          }
          <JourLayout
            jour=''
            i={jours.length + 2}
            yD={yD}
          />
        </View>
      </AnimatedScrollViewJour>
    </View>
  )
}

const HEADER_HEIGHT = 200
const y = new Animated.Value(0)
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const AnimatedHeader = Animated.createAnimatedComponent(View)

const cardHeight = 150


function Principals (props) {
  // const insets = useSafeAreaInsets()
  // const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
  const dispatch = useDispatch()
  const color = useSelector(state => state.Color)
  const utilisateur = useSelector(state => state.Utilisateur.connecterUtilisateur)
  const tasks = useSelector(state => state.Tasks)
  const listViewBody = useRef()

  const { dataAlert } = useSelector(state => state.Alert)

  const [vibreur, setVibreur] = useState(false)
  const [songUrl, setSongUrl] = useState('')

  const [state, setState] = useStateF({
    data: [],
    searchValue: '',
    active: new Date().getDay(),
    page: 0,
    now: new Date().getDay()
  })

  const [dureeVibreurAlert, setDureeVibreurAlert] = useState(0)

  const [updateAt, setUpdateAt] = useState(new Date()) //eslint-disable-line

  const height = 40
  const jours = [
    'Alahady',
    'Alatsinainy',
    'Talata',
    'Alarobia',
    'Alakamisy',
    'Zoma',
    'Sabotsy'
  ]

  useEffect(() => {
    if (dataAlert) {
      const { vibreurAlert, songUrl, dureeVibreurAlert } = dataAlert
      setVibreur(vibreurAlert)
      setSongUrl(songUrl)
      setDureeVibreurAlert(dureeVibreurAlert)
    }
  }, [dataAlert])

  useEffect(() => {
    const dat = tasks.dataTasks.find(e => {
      return e.pseudoUtilisateur === utilisateur.pseudoUtilisateur
    })
    if (dat) {
      dispatch({ type: 'INIT_DATA_TASKS', data: dat.data })
    }
    dispatch({
      type: 'DATA_FILTER',
      active: state.active
    })
    dispatch({ type: 'DATA_ACTIVE' })
  }, [tasks.dataTasks]) // eslint-disable-line

  const OnEndScroll = (e, listView) => {
    if (state.value !== Math.round(e.nativeEvent.contentOffset.y / height)) {
      const lengthStock = Math.abs(Math.round(e.nativeEvent.contentOffset.y / height))

      Animated.spring(y, {
        toValue: 0,
        useNativeDriver: true
      }).start()

      listViewBody.current.getNode().scrollTo({
        y: 0,
        animated: true
      })

      setState({
        active: lengthStock
      })
      dispatch({
        type: 'DATA_FILTER',
        active: lengthStock
      })
      dispatch({ type: 'DATA_ACTIVE' })
    }
  }

  const newArrayDate = useCallback((data) => {
    const stock = [jours[Math.floor(parseInt(data.idTasks) / 24 / 60 / 60 / 1000)], data.heureDebut, data.idTasks]
    return stock
  }, []) // eslint-disable-line

  const nextData = useCallback((h, datas) => {
    let indexActive
    datas.map((e, i) => {
      if (e.idTasks === h.idTasks) {
        indexActive = i
      }
      return null
    })

    const stock = datas[indexActive + 1]
    let data
    if (stock) {
      data = stock
    } else {
      data = datas[0]
    }

    return newArrayDate(data)
  }, []) // eslint-disable-line

  const thisorder = (data, column) => {
    if (data) {
      return data.map(value => {
        return value
      }).sort(function (a, b) {
        return a[column] - b[column]
      })
    }
    return []
  }

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y } } }],
    {
      // listener: event => {
      //   setTopPostionFuction(event.nativeEvent.contentOffset.y)
      // },
      useNativeDriver: true
    }
  )

  // const headerHeight = y.interpolate({
  //    inputRange: [0, HEADER_HEIGHT + insets.top],
  //    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
  //   extrapolate: 'clamp'
  // })

  const runSong = () => {
    console.log('runSong..', vibreur)
    if (vibreur) {
      Vibration.vibrate(1000 * dureeVibreurAlert, true)
    } else {
      if (songUrl) {
        try {
        // play the file tone.mp3
          SoundPlayer.playSoundFile(songUrl, 'mp3', 1000 * dureeVibreurAlert)
        } catch (e) {
          console.log('cannot play the sound file', e)
        }
      }
      // setTimeout(() => {
      //   Vibration.cancel()
      // }, 1000 * dureeVibreurAlert)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        className='header'
        style={{
          width: '100%',
          position: 'relative'
        }}
      >
        <AnimatedHeader
          style={{
            overflow: 'hidden',
            height: HEADER_HEIGHT
            // top: -HEADER_HEIGHT,
            // transform: [{ translateY: headerHeight }]
          }}
        >
          <Image
            source={marcus}
            style={{
              width: width + 80,
              height: 200,
              position: 'absolute'
            }}
          />
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: 50,
              width: width,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Icon
                name='menu'
                color='white'
                size={30}
                style={{ padding: 10 }}
              />
            </TouchableOpacity>

            {/* <Text style={{ color: textColor }}>{datenow[0]}</Text> */}
            <TouchableOpacity
              onPress={() => {
                props.navigation.closeDrawer()
                props.navigation.navigate('Users',
                  {
                    color: color
                  }
                )
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: color.activeColor.primary.dark
                }}
              >
                {
                utilisateur?.imageUtilisateur
                  ? <Avatar
                    title={utilisateur?.pseudoUtilisateur ? utilisateur?.pseudoUtilisateur[0].toUpperCase() : ''}
                    source={{ uri: utilisateur?.imageUtilisateur }}
                  />
                  : <Avatar
                    title={utilisateur?.pseudoUtilisateur ? utilisateur?.pseudoUtilisateur[0].toUpperCase() : ''}
                    source={marcus}
                  />
                }
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 120
            }}
          >
            <ScollDay {...{ jours, height, OnEndScroll }} />
          </View>
          <View
            style={{
              backgroundColor: color.activeColor.primary.light,
              height: 5,
              width: '100%',
              position: 'absolute',
              bottom: 0
            }}
          >
            <View
              style={{
                backgroundColor: color.activeColor.primary.dark,
                height: 5,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                width: (tasks.dataFilter.length !== 0 ? parseInt((tasks.lenTaskFinish / tasks.dataFilter.length) * 100) : 0) + '%'
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: (tasks.dataFilter.length !== 0 ? parseInt((tasks.lenTaskFinish / tasks.dataFilter.length) * 100) : 0) + '%',
                top: -20,
                color: color.activeColor.primary.light
              }}
            >{(tasks.dataFilter.length !== 0 ? parseInt((tasks.lenTaskFinish / tasks.dataFilter.length) * 100) : 0) + '%'}
            </Text>
          </View>
        </AnimatedHeader>
      </View>

      {/* body of application */}

      <View
        style={{
          width: width,
          ...styles.root
          // height: wHeight - 100
        }}
      >
        {
          tasks?.dataFilter.length > 0
            ? (
              <AnimatedScrollView
                scrollEventThrottle={16}
                ref={listViewBody}
                onScroll={onScroll}
                snapToInterval={cardHeight}
              >
                {
                  tasks.dataFilter.map((item, index) => {
                    const stock = state.active === state.now
                    let resp = 0
                    tasks.dataFilter.map((e, i) => {
                      if (e.idTasks === tasks.idTaskActive) {
                        resp = i
                      }
                      return null
                    })
                    return (
                      <Block
                        key={index * item.idTasks}
                        i={index}
                        idTasks={item.idTasks}
                        finish={
                          (state.active < state.now)
                            ? false
                            : (index < resp)
                        }
                        {...{ setUpdateAt, cardHeight}}
                        runSong={runSong}
                        datas={item}
                        start={tasks.idTaskActive === item.idTasks}
                        now={stock}
                        debut={
                          (stock && item.idTasks < tasks.idTaskActive)
                            ? nextData(item, thisorder(tasks.dataTask, 'idTasks'))
                            : newArrayDate(item)
                        }
                        navigation={props.navigation}
                        fin={nextData(item, thisorder(tasks.dataTask, 'idTasks'))}
                        active={state.active}
                        y={y}
                      />
                    )
                  })
                }
              </AnimatedScrollView>)
            : <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                opacity: 0.6,
                marginTop: height * 2
              }}
            >Mampidira asa vaovao
            </Text>
        }
        {/* <View style={{ height: 20 }} /> */}
      </View>
    </View>
  )
}

export default Principals
