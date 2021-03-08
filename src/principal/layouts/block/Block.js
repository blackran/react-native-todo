import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import check from './statics/images/check_cool.png'
import clock from './statics/images/clock.png'
import wait from './statics/images/wait.png'
import Chrono from './layouts/chrono/Chrono'
import Move from '../../../animation/Move'

const { width } = Dimensions.get('window')

function Block (props) {
  const dispatch = useDispatch()
  const { color, tasks } = useSelector(state => ({ other: state.Other, tasks: state.Tasks, color: state.Color }))
  const [dimP, setDimP] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [dimC, setDimC] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const [state, setStateTrue] = useState({
    // date: props.datas.durationTasks,
    date: 1,
    // stockInterval: null,
    finish: false
  })

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
    }, []) // eslint-disable-line

  // useEffect(() => {
  //     setState({ finish: props.finish })
  //     return () => clearInterval(state.stockInterval)
  // }, []) // eslint-disable-line

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

  const { idTasks, active, datas, fin, start, i, finish } = props

  const style1 = {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: start
      ? color.activeColor.primary.dark
      : (finish ? color.activeColor.primary.light + '99' : '#688898'),
    opacity: finish ? 0.5 : 1,
    padding: 10,
    borderRadius: 5,
    paddingBottom: 15,
    position: 'relative'
  }

  const style2 = Object.assign({}, style1, styles.shadow)

  return (
    <Move
      delais={i * 10}
      xD={(i + 1) * width}
      yD={0}
    >
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
            borderRadius: 5,
            top: ((dimP.height - dimC.height) / 2),
            // left: ((dimP.width - dimC.width) / 2),
            left: 2,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: '#688898',
              height: dimP.height - 30,
              borderRadius: 5,
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
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              fontSize: 24,
              textDecorationLine: finish ? 'line-through' : 'none',
              fontWeight: '700',
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
            alignItems: 'center'
          // borderWidth: 1
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
                padding: 5,
                borderTopWidth: 1,
                borderColor: color.activeColor.fontColor.light
              }}
            >
              <Text style={{ color: color.activeColor.fontColor.light }}>
                Vibreur
              </Text>
            </View>

        }

      </View>
    </Move>
  )
}

const styles = StyleSheet.create({
  shadow: {
    color: 'white'
  }
})

export default Block
