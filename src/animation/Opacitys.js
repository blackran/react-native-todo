import React, { Component } from 'react'
import { Animated } from 'react-native'

class Opacitys extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount () {
    setTimeout(() => this.activeAnimation(), this.props.delais)
  }

  activeAnimation () {
    Animated.parallel([
      Animated.spring(this.state.opacity, {
        toValue: 1
      })
    ]).start()
  }

  render () {
    return (
      <Animated.View
        style={{ ...this.props.styles, opacity: this.state.opacity }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default Opacitys
