import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import check from './statics/images/check_cool.png'
import clock from './statics/images/clock.png'
import wait from './statics/images/wait.png'
import Chrono from './layouts/chrono/Chrono'
// import Opacitys from '../../../animation/Opacitys'

import IconIonic from 'react-native-ionicons'

const { width, height: wHeight } = Dimensions.get('window')

const height = wHeight - 180

function Block (props) {
  const dispatch = useDispatch()
  const { color, tasks } = useSelector(state => ({ other: state.Other, tasks: state.Tasks, color: state.Color }))
  const [dimP, setDimP] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [dimC, setDimC] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const [second, setSecond] = useState(0) //eslint-disable-line

  const [state, setStateTrue] = useState({
    // date: props.datas.durationTasks,
    date: 1,
    // stockInterval: null,
    finish: false
  })

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
    }, []) // eslint-disable-line

  useEffect(() => {
    const stock = setInterval(() => {
      setSecond(() => new Date().getSeconds())
    }, 1000)
    return () => clearInterval(stock)
  }, [])

  useEffect(() => {
    if (state.finish !== props.finish) {
      setState({ finish: props.finish })
    }
  }, [props.finish]) // eslint-disable-line

  const setDouble = (e) => {
    if (e < 10) {
      return '0' + e
    } else {
      return e
    }
  }

  const dateNowToString = () => {
    const date = new Date()
    const jours = [
      'Alahady',
      'Alatsinainy',
      'Talata',
      'Alarobia',
      'Alakamisy',
      'Zoma',
      'Sabotsy'
    ]

    return [jours[date.getDay()], setDouble(date.getHours()) + ':' + setDouble(date.getMinutes()) + ':' + setDouble(date.getSeconds())]
  }

  const debut = () => {
    const { datas, debut, fin, finish } = props
    let db = fin
    if (!finish) {
      db = tasks.idTaskActive === datas.idTasks ? dateNowToString() : debut
    }
    return db
  }

  const limiterWord = (phrase, len) => {
    return phrase && phrase.split(' ').slice(0, len).join(' ') + ' ...'
  }

  const {
    idTasks, active, datas, fin, start, y,
    i,
    finish
  } = props

  const { icons } = useSelector(state => ({ icons: state.Tasks.dataIcons }))
  const [iconActive, setIconActive] = useState([])

  const findIcon = (e) => {
    let sto
    if (e) {
      sto = icons
        .filter(h => e.includes(h.name))
        .map(h => h.icon)
    }
    if (sto) {
      setIconActive(sto)
    }
  }

  useEffect((e) => {
    findIcon(datas.categorieTasks)
  }, [datas.categorieTasks]) //eslint-disable-line

  const cardHeight = 150

  const style1 = {
    flex: 1,
    // justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: start
      ? color.activeColor.primary.dark
      : (finish ? color.activeColor.primary.light : '#688898'),
    padding: 10,
    borderRadius: 10,
    paddingBottom: 10,
    position: 'relative',
    height: cardHeight - 5
  }

  const style2 = Object.assign({}, style1, styles.shadow)

  const position = Animated.subtract(i * cardHeight, y)
  const isDisappeearing = -cardHeight
  const isTop = 0
  const isBottom = height - cardHeight
  const isAppearing = height

  const scale = position.interpolate({
    inputRange: [isDisappeearing, isTop, isBottom, isAppearing],
    // outputRange: [0.5, 1, 1, 0.5]
    outputRange: [0.5, 1, 1, 1],
    extrapolate: 'clamp'
  })

  const opacity = position.interpolate({
    inputRange: [isDisappeearing, isTop, isBottom, isAppearing],
    // outputRange: [0.5, 1, 1, 0.5]
    outputRange: [0.5, 1, 1, 1]
  })

  const translateY = Animated.add(
    // Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + i * cardHeight],
      outputRange: [0, -i * cardHeight],
      extrapolateRight: 'clamp'
    })
  )
  //   ,position.interpolate({
  //     inputRange: [isBottom, isAppearing],
  //     outputRange: [0, -cardHeight / 4],
  //     extrapolate: 'clamp'
  //   })
  // )

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      {start &&
        <View
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout
            // console.log({ widthC: width, heightC: height })
            setDimC({ x, y, width, height })
          }}
          style={{
            backgroundColor: '#88b1c5',
            width: width - 4,
            height: dimP.height - 60,
            position: 'absolute',
            borderRadius: 10,
            top: ((dimP.height - dimC.height) / 2),
            // left: ((dimP.width - dimC.width) / 2),
            left: 2,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: (dimC.width !== 0 && dimC.height !== 0 && dimP.width !== 0 && dimP.height !== 0) ? 1 : 0
          }}
        >
          <View
            style={{
              backgroundColor: '#688898',
              height: dimP.height - 30,
              borderRadius: 10,
              width: width - 11
            }}
          />
        </View>}

      <View
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout
          // console.log({ widthP: width, heightP: height })
          setDimP({ x, y, width, height })
        }}
        style={start ? style2 : style1}
      >
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              fontSize: 24,
              textDecorationLine: finish ? 'line-through' : 'none',
              fontWeight: '700',
              width: 160,
              color: start
                ? color.activeColor.fontColor.light
                : (finish ? color.activeColor.fontColor.dark : color.activeColor.fontColor.light)
            }}
            >{datas.titleTasks}
            </Text>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 40
          }}
          >
            <Chrono
              finish={finish}
              color={color}
              navigation={props.navigation}
              content={datas.contentTasks}
              debut={debut()}
              fin={fin}
              start={start}
              active={active}
            />
            <Image
              source={start ? clock : (finish ? check : wait)}
              style={{
                width: 30,
                height: 30,
                marginLeft: 5,
                opacity: start ? 1 : 0.6
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => { dispatch({ type: 'SHOW_DETAILS', idTasks }) }}>
            <Text
              style={{
                color: start
                  ? color.activeColor.fontColor.light
                  : (finish ? color.activeColor.fontColor.dark : color.activeColor.fontColor.light),
                opacity: 0.8,
                width: 180
              }}
            >
              {
                idTasks === tasks.showDetails ? datas.contentTasks : limiterWord(datas.contentTasks, 3)
              }
            </Text>
          </TouchableOpacity>
        </View>
        {
          start &&
            <View
              style={{
                marginTop: 20,
                padding: 10,
                borderTopWidth: 1,
                borderColor: color.activeColor.fontColor.light + 'aa',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  marginRight: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
              >
                {iconActive && iconActive.map(e =>
                  <IconIonic
                    key={e}
                    name={e}
                    color={color.activeColor.fontColor.light}
                    size={25}
                    style={{ margin: 3 }}
                  />
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: color.activeColor.fontColor.light,
                    marginLeft: 10,
                    fontSize: 15
                  }}
                >
                  {datas.type}
                </Text>
              </View>
            </View>
        }
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    color: 'white'
  }
})

export default Block
