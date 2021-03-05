import React, { useState, useEffect, useCallback } from 'react'
import { Text, Vibration, StyleSheet, View } from 'react-native'
import { betweenTwoDate } from '../../../DatePicker/DatePicker'
import Dialog from 'react-native-dialog'

import { useDispatch } from 'react-redux'

function Chrono (props) {
  const [visible, setVisible] = useState(false)
  const [state, setStateTrue] = useState({
    date: null,
    stockInterval: null,
    start: false,
    style: {}
  })

  const setState = useCallback((data) => {
    setStateTrue(Object.assign({}, state, data))
    }, []) // eslint-disable-line

  // chrono ==================================================================

  const dispatch = useDispatch()
  const dispatchOne = useCallback(() => {
    setTimeout(() => {
      console.log('false .... ')
      Vibration.vibrate([500, 1000, 1000], true)
      setTimeout(() => {
        Vibration.cancel()
      }, 10000)

      dispatch({
        type: 'DATA_FILTER',
        active: props.active
      })
      dispatch({ type: 'DATA_ACTIVE' })
      setVisible(false)
    },  2000)
  })

  useEffect(() => {
    if (visible && state.date>1 && state.date < 2000) {
      console.log('finish ...')
      dispatchOne()
    }
  }, [dispatchOne, visible])

  useEffect(() => {
    const dureeVibreur = 10000
    console.log(state.date)
    if (state.date > 1 && state.date < 5 * 60 * 1000) {
      Vibration.vibrate([500, 1000, 1000], true)
      setTimeout(() => {
        Vibration.cancel()
      }, dureeVibreur)
      setVisible(true)
    }
  }, [state.date]) // eslint-disable-line

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
    <View>
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
      <View style={styles.container}>
        <Dialog.Container visible={visible}>
          <Dialog.Title style={{ textAlign: 'center' }}>Fotoana Fialana Sasatra</Dialog.Title>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 20

            }}
          >
            <View
              style={{
                borderWidth: 3,
                borderColor: (state.date > 1 && state.date < 1 * 60 * 1000) ? 'red' : 'black',
                width: 150,
                height: 150,
                borderRadius: 150,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
              }}
            >
              <Text
                style={{
                  ...props.style,
                  fontSize: 30,
                  color: (state.date > 1 && state.date < 1 * 60 * 1000) ? 'red' : 'black'
                }}
              >
                {secondToDate(state.date)}
              </Text>
            </View>
          </View>
          <Dialog.Button label='Actualise' onPress={dispatchOne} />
        </Dialog.Container>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Chrono
