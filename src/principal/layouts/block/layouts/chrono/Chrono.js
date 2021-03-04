import React, { useState, useEffect, useCallback } from 'react'
import { Text, Vibration } from 'react-native'
import { betweenTwoDate } from '../../../DatePicker/DatePicker'

function Chrono (props) {
  const [state, setStateTrue] = useState({
    date: 1,
    stockInterval: null,
    start: false,
    style: {}
  })

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
    }, []) // eslint-disable-line

  // chrono ==================================================================

  const chrono = () => {
    props.navigation.navigate('Notification', { lastTask: state.date })

    // const stock = setInterval(() => {
    //   if (state.date > 0) {
    //     setState((state) => {
    //       return { date: state.date - 1000 }
    //     })
    //   } else {
    //     clearInterval(state.stockInterval)
    //     Vibration.vibrate([500, 1000, 1000], true)
    //     setTimeout(() => {
    //       Vibration.cancel()
    //       setState({ date: 0 })
    //     }, 2000)
    //     props.navigation.navigate('Notification', { lastTask: props.content })
    //   }
    // }, 1000)
    //
    // setState({ stockInterval: stock })
  }

  useEffect(() => {
    // console.log(state.start, props.start, state.start !== props.start)
    if (state.date > 1 && state.date < 5 * 60 * 100) {
      console.log(state.date, ' chrono ', 5 * 60 * 100)
      // chrono()
    }
    // if (state.start !== props.start) {
    //   setState({ start: props.start })
    //   if (props.start) {
    //     chrono()
    //   } else {
    //     clearInterval(state.stockInterval)
    //   }
    // }
    // if (state.style !== props.style) {
    //   setState({ style: props.style })
    // }
    // return () => clearInterval(state.stockInterval)
  }, [state]) // eslint-disable-line

  // chrono ==================================================================

  useEffect(() => {
    const { debut, fin } = props
    const stock = betweenTwoDate(debut, fin)
    // if (debut === fin) {
    //   stock = 0
    // }
    setState({ date: stock, style: props.style })
  }, [props, setState])

  const setDouble = (e) => {
    if (e < 10) {
      return '0' + e
    } else {
      return e
    }
  }

  const secondToDate = (e) => {
    let response = '00:00:00'
    if (e > 0) {
      const oneHeure = (60 * 60 * 1000)
      const oneMinute = (60 * 1000)
      const oneSecond = 1000

      const heure = Math.floor(e / oneHeure)
      const resteHeure = (e - (heure * oneHeure)) >= 0 ? (e - (heure * oneHeure)) : 0
      const minute = Math.floor(resteHeure / oneMinute)
      const resteMinute = (minute * oneMinute)
      const second = Math.abs(Math.floor((e - (e - resteMinute) - (resteHeure)) / oneSecond))
      response = (setDouble(heure) + ':' + setDouble(minute) + ':' + setDouble(second))
    }

    return response
  }

  return (
    <Text
      style={{
        fontSize: 24,
        textDecorationLine: props.finish ? 'line-through' : 'none',
        color: props.finish
          ? props.color.activeColor.fontColor.dark
          : (props.start ? props.color.activeColor.fontColor.dark : props.color.activeColor.fontColor.light)
      }}
    >
      {!props.finish ? secondToDate(state.date) : '00:00:00'}
    </Text>
  )
}

export default Chrono
