import React, { Component } from 'react'
import { Animated } from 'react-native'

class Scale extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount () {
    setTimeout(() => this.activeAnimation(), this.props.delais)
  }

  activeAnimation () {
    Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 1
      }),
      Animated.spring(this.state.opacity, {
        toValue: 1
      })
    ]).start()
  }

  render () {
    return (
      <Animated.View
        style={{ ...this.props.styles, transform: [{ scale: this.state.scale }], opacity: this.state.opacity }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default Scale
