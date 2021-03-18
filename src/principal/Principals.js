import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  ScrollView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  // FlatList,
  Animated
} from 'react-native'
import styles from './statics/styles/Style'
import { useDispatch, useSelector } from 'react-redux'
import Block from './layouts/block/Block'

// import { faBars } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Avatar } from 'react-native-elements'
// import userDefault from './statics/images/user.png'
import marcus from './statics/images/watch-dogs-2-wallpapers-pc-game.jpg'
import Icon from 'react-native-ionicons'

const { width } = Dimensions.get('window')

function useStateF (data) {
  const [state, setStateTrue] = useState(data)
  const setState = (data) => {
    setStateTrue((e) => Object.assign({}, e, data))
  } // eslint-disable-line

  return [state, setState]
}

function Principals (props) {
  // const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
  const dispatch = useDispatch()
  const color = useSelector(state => state.Color)
  const utilisateur = useSelector(state => state.Utilisateur.connecterUtilisateur)
  const tasks = useSelector(state => state.Tasks)

  const [state, setState] = useStateF({
    data: [],
    searchValue: '',
    active: new Date().getDay(),
    page: 0,
    now: new Date().getDay()
  })

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

  const textColor = color.activeColor.primary.light

  // const y = new Animated.Value(0)
  const y = new Animated.Value(0)

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y } } }],
    { useNativeDriver: true }
  )

  const [isScroll, setIsScroll] = useState(0)

  y.addListener(({ value }) => {
    // if (isScroll < value) {
    //   console.log('down')
    // } else {
    //   console.log('up')
    // }
    // setIsScroll(value)
  })

  useEffect(() => {
    console.log('test ... ', y)
    // y.setValue(isScroll)
  }, [y]) // eslint-disable-line

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
          height: 180
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
          <View
            style={{
              height: height * 3,
              width: 300,
              marginLeft: 10
            }}
          >
            <ScrollView
              style={{
                ...styles.myscroll,
                height: height * 3,
                width: 190
              }}
              showsVerticalScrollIndicator={false}
              onScroll={(e) => OnScroll(e)}
              onMomentumScrollEnd={(e) => OnEndScroll(e)}
              centerContent={false}
              ref={listView}
            >
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
            </ScrollView>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: color.activeColor.primary.light,
          height: 5,
          width: '100%'
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

      {/* body of application */}
      {/* onScrollBeginDrag={(e) => console.log('start', e.nativeEvent.contentOffset.y)} */}
      {/* onScrollEndDrag={() => console.log('end')} */}
      {/* {...{ onScroll }} */}

      <View style={{ width: width, ...styles.root }}>
        {
          tasks?.dataFilter.length > 0
            ? (
              <AnimatedScrollView onScroll={onScroll}>
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
