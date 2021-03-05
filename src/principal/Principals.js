import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  // PanResponder, TouchableHighlight,
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './statics/styles/Style'
import { useDispatch, useSelector } from 'react-redux'
// import { Icon } from 'react-native-elements'
import Block from './layouts/block/Block'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Avatar } from 'react-native-elements'
import userDefault from './statics/images/user.png'
import marcus from './statics/images/watch-dogs-2-wallpapers-pc-game.jpg'

import { order } from './layouts/array/Array'
const { width } = Dimensions.get('window')

function Principals (props) {
  const dispatch = useDispatch()
  // const { color, tasks, utilisateur } = useSelector(state => {
  //     return { color: state.Color, utilisateur: state.Utilisateur.connecterUtilisateur, tasks: state.Tasks }
  // })
  const color = useSelector(state => state.Color)
  const utilisateur = useSelector(state => state.Utilisateur.connecterUtilisateur)
  const tasks = useSelector(state => state.Tasks)

  const [state, setStateTrue] = useState({
    data: [],
    searchValue: '',
    active: new Date().getDay(),
    page: 0,
    now: new Date().getDay(),
    // fontSize: [12, 12, 12, 12, 12, 12, 12],
    lengthTaskFinish: 0
  })

  const [datenow, setDateNow] = useState('00:00:00')

  const listView = useRef()

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

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
  }, []) // eslint-disable-line

  const setDouble = (e) => {
    if (e < 10) {
      return '0' + e
    } else {
      return e
    }
  }

  const dateNowToString = useCallback(() => {
    const date = new Date()
    return setDouble(date.getHours()) + ':' + setDouble(date.getMinutes()) + ':' + setDouble(date.getSeconds())
  }, [])

  const lengthTaskFinish = useCallback(() => {
    if (tasks.dataFilter.length > 0) {
      const stock = tasks.dataFilter.filter(e => {
        if (e) {
          if (state.active < state.now) {
            return true
          } else {
            return e.idTasks < tasks.idTaskActive
          }
        } else {
          return false
        }
      })
      setState({ lengthTaskFinish: stock.length })
    }
  }, [tasks.dataFilter]) // eslint-disable-line

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

    lengthTaskFinish()
  }, [tasks.dataTasks]) // eslint-disable-line

  useEffect(() => {
    const stock = setInterval(() => {
      setDateNow(dateNowToString())
    }, 1000)
    return () => clearInterval(stock)
  }, []) // eslint-disable-line

  useEffect(() => {
    setTimeout(() => listView.current.scrollTo({
      x: 0,
      y: (new Date().getDay() * height),
      animated: true
    }), 1)
  }, [listView])

  const OnScroll = (e) => {
    if (state.value !== Math.round(e.nativeEvent.contentOffset.y / height)) {
      setState({ active: Math.abs(Math.round(e.nativeEvent.contentOffset.y / height)) })
    }
  }

  const OnEndScroll = (e) => {
    if (state.value !== Math.round(e.nativeEvent.contentOffset.y / height)) {
      const lengthStock = Math.abs(Math.round(e.nativeEvent.contentOffset.y / height))
      listView.current.scrollTo({
        x: 0,
        y: lengthStock * height,
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

  const newArrayDate = (data) => {
    const stock = [jours[Math.floor(parseInt(data.idTasks) / 24 / 60 / 60 / 1000)], data.heureDebut]
    return stock
  }

  const nextData = (h, datas) => {
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
  }

  const thisorder = (data, column) => {
    return data.map(value => {
      return value
    }).sort(function (a, b) {
      return a[column] - b[column]
    })
  }

  const textColor = color.activeColor.primary.light

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          overflow: 'hidden',
          height: 220,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3
        }}
      >
        <Image
          source={marcus}
          style={{
            width: width + 80,
            height: 300,
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
            <FontAwesomeIcon
              icon={faBars}
              color='white'
              size={30}
            />
          </TouchableOpacity>
          <Avatar
            rounded
            title={utilisateur?.pseudoUtilisateur ? utilisateur?.pseudoUtilisateur[0].toUpperCase() : ''}
            source={utilisateur?.imageUtilisateur ? utilisateur.imageUtilisateur : userDefault}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 10,
            height: 170
          }}
        >
          <ScrollView
            style={{
              ...styles.myscroll,
              height: height * 3
            }}
            showsVerticalScrollIndicator={false}
            onScroll={(e) => OnScroll(e)}
            // onScrollEndDrag={ OnEndScroll() }
            onMomentumScrollEnd={(e) => OnEndScroll(e)}
            centerContent={false}
            ref={listView}
          >
            {/* <View style={styles.myscroll}> */}
            <View
              style={{
                height: height * (jours.length + 2),
                width: 190
              }}
            >
              <View
                style={{
                  height: height,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: textColor,
                    fontSize: 12
                  }}
                />
              </View>

              {
                jours.map((e, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        height: height,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      <Text
                        style={{
                          color: textColor,
                          fontSize: state.active === index ? (width / 10) : 14,
                          opacity: state.now === index ? 1 : (state.now === index ? 1 : 0.8)
                        }}
                      > {e}
                      </Text>
                    </View>
                  )
                })
              }

              <View
                style={{
                  height: height,
                  // borderWidth: 1,
                  // borderColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12
                  }}
                />
              </View>

            </View>
            {/* </View> */}
          </ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: textColor }}>
              Vita {setDouble(state.lengthTaskFinish)}/{setDouble(tasks.dataFilter.length)}
            </Text>
            <Text style={{ color: textColor }}>{datenow}</Text>
          </View>
        </View>
      </View>

      {/* body of application */}

      <ScrollView style={{ width: width, ...styles.root }}>
        {
          order(tasks?.dataFilter, 'idTasks').map((e, i) => {
            if (e) {
              const stock = state.active === state.now
              return (
                <Block
                  key={i}
                  i={i}
                  finish={
                    (state.active < state.now)
                      ? false
                      : (e.idTasks < tasks.idTaskActive)
                  }
                  datas={e}
                  start={tasks.idTaskActive === e.idTasks}
                  now={stock}
                  debut={
                    (stock && e.idTasks < tasks.idTaskActive)
                      ? nextData(e, thisorder(tasks.dataTask, 'idTasks'))
                      : newArrayDate(e)
                  }
                  navigation={props.navigation}
                  fin={nextData(e, thisorder(tasks.dataTask, 'idTasks'))}
                  active={state.active}
                />
              )
            }
            return null
          })
        }
      </ScrollView>
    </View>
  )
}

export default Principals
