import React from 'react'
import {
  Text,
  Animated
} from 'react-native'

function Jours ({ jour, i, yD }) {
  const index = i
  const cardHeight = 40
  const height = cardHeight * 3

  const position = Animated.subtract(index * cardHeight, yD)
  const isDisappeearing = -cardHeight
  const isTop = cardHeight
  // const isBottom = height - (cardHeight * 2)
  const isAppearing = height

  const scale = position.interpolate({
    // inputRange: [isAppearing, isTop, isBottom, isAppearing],
    inputRange: [isDisappeearing, isTop, isAppearing],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  })

  const opacity = position.interpolate({
    inputRange: [isDisappeearing, isTop, isAppearing],
    outputRange: [0, 1, 0]
  })

  const translateY = Animated.add(
    Animated.add(
      yD,
      yD.interpolate({
        inputRange: [0, 0.00001 + index * cardHeight],
        outputRange: [0, -index * cardHeight],
        extrapolateRight: 'clamp'
      })
    ),
    position.interpolate({
      inputRange: [isTop, isAppearing],
      outputRange: [0, -cardHeight / 10],
      extrapolate: 'clamp'
    })
  )

  return (
    <Animated.View
      style={{
        opacity,
        // backgroundColor: jour ? '#000' : 'transparent',
        transform: [{ translateY }, { scale }],
        height: cardHeight
      }}

    >
      <Text style={{ color: 'green', fontSize: 30, textAlign: 'center' }}>{jour}</Text>
    </Animated.View>
  )
}

export default Jours
