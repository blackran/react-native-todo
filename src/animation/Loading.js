import React, { useState, useEffect, useRef } from 'react'
import { Animated, View, Text } from 'react-native'

function OneLoading ({ start }) {
  const [active, setActive] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    if (start) {
      if (active) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start(() => setFinish(!finish))
      } else {
        fadeAnim.setValue(0)
        setFinish(!finish)
      }
    }
  }, [active, fadeAnim]) // eslint-disable-line

  useEffect(() => {
    setActive(!active)
  }, [finish, start]) // eslint-disable-line

  return (
    <Animated.View
      style={{
        transform: [{ scale: fadeAnim }],
        opacity: fadeAnim,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      }}
    >
      <Text
        style={{
          borderColor: 'white',
          borderWidth: 1,
          width: 20,
          height: 20,
          borderRadius: 20,
          margin: 10
        }}
      />
    </Animated.View>
  )
}

function Loading ({ children, start, animation, styles }) {
  return (
    <View>
      {children}
      {
        animation &&
        <View
          style={{
            ...styles,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <OneLoading start />
          <OneLoading start />
          <OneLoading start />
        </View>
      }
    </View>
  )
}

export default Loading
