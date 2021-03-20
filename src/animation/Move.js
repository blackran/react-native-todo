import React, { useEffect, useRef, useCallback } from 'react'
import { Animated } from 'react-native'

function Move ({ isFinish, xD, yD, onLayout, change, styles, children, delais, fama }) {
  const fadeAnim = useRef(new Animated.ValueXY({ x: xD, y: yD })).current

  const fadeIn = useCallback(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: { x: 0, y: 0 },
      duration: delais
    }).start(() => {
      if (isFinish) {
        isFinish()
      }
    })
  }, [delais, fadeAnim]) // eslint-disable-line

  const fadeOut = useCallback(() => {
    // Will change fadeAnim value to 0 in 5 seconds
    if (isFinish) {
      Animated.timing(fadeAnim, {
        toValue: { x: -xD * 2, y: -yD },
        duration: delais
      }).start(() => isFinish())
    }
  }, [delais, fadeAnim]) // eslint-disable-line

  useEffect(() => {
    console.log({ change, fama })
    if (change && fama) {
      fadeOut()
    } else {
      fadeIn()
    }
  }, [change, fadeIn, fadeOut, fama])

  return (
    <Animated.View
      style={{
        transform: fadeAnim.getTranslateTransform(),
        // opacity: this.state.opacity,
        ...styles
      }}
      onLayout={onLayout}
    >
      {children}
    </Animated.View>
  )
}

export default Move
