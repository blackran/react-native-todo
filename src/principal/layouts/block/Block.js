import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Image, Animated, Dimensions, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import check from './statics/images/check_cool.png'
import clock from './statics/images/clock.png'
import wait from './statics/images/wait.png'
import Chrono from './layouts/chrono/Chrono'
import Move from '../../../animation/Move'

const { height } = Dimensions.get('window')

function Block (props) {
  const { color, task } = useSelector(state => ({ other: state.Other, task: state.Tasks, color: state.Color }))

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
      db = task.idTaskActive === datas.idTasks ? dateNowToString() : debut
    }
    return db
  }

  const limiterWord = (phrase, len) => {
    return phrase && phrase.split(' ').slice(0, len).join(' ') + ' ...'
  }

  const { active, datas, fin, start, i, finish } = props

  const style1 = {
    flex: 1,
    justifyContent: 'space-between',
    margin: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: start
      ? color.activeColor.primary.dark
      : (finish ? color.activeColor.primary.light + '99' : color.activeColor.primary.dark + '33'),
    opacity: finish ? 0.5 : 1,
    padding: 10,
    borderRadius: 5,
    paddingBottom: 15
  }

  const style2 = Object.assign({}, style1, styles.shadow)

  return (
    <Animated.View>
      <Move
        delais={i * 10}
        xD={0}
        yD={(i + 1) * height}
        styles={start ? style2 : style1}
      >
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              fontSize: 24,
              textDecorationLine: finish ? 'line-through' : 'none',
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
          <Text
            style={{
              color: start
                ? color.activeColor.fontColor.light
                : (finish ? color.activeColor.fontColor.dark : color.activeColor.fontColor.light),
              opacity: 0.8
            }}
          >{start ? datas.contentTasks : limiterWord(datas.contentTasks, 3)}
          </Text>
        </View>
      </Move>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    color: 'white'
  }
})

export default Block
