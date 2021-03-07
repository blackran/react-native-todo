import React, { useEffect, useRef, useCallback } from 'react'
import { Animated } from 'react-native'

function Move ({ xD, yD, onLayout, change, styles, children, delais }) {
  const fadeAnim = useRef(new Animated.ValueXY({ x: xD, y: yD })).current

  const fadeIn = useCallback(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: { x: 0, y: 0 },
      duration: delais
    }).start()
  }, [delais, fadeAnim])

  const fadeOut = useCallback(() => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: { x: 0, y: 0 },
      duration: delais
    }).start()
  }, [delais, fadeAnim])

  useEffect(() => {
    if (change) {
      fadeIn()
    } else {
      fadeOut()
    }
  }, [change, fadeIn, fadeOut])

  return (
    <Animated.View
      style={{
        transform: fadeAnim.getTranslateTransform(),
        // opacity: this.state.opacity,
        ...styles
      }}
      onLayout={onLayout}
    >
      {
        // console.log(fadeAnim.getTranslateTransform())
      }
      {children}
    </Animated.View>
  )
}

export default Move
