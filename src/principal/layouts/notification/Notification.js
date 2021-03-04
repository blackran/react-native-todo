import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Vibration } from 'react-native'

class Notification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: 5 * 60 * 1000,
      stockInterval: null,
      stock: 5 * 60 * 1000
    }
  }

  chrono () {
    const stock = setInterval(() => {
      if (this.state.date > 0) {
        this.setState((state) => {
          return { date: state.date - 1000 }
        })
      } else {
        clearInterval(this.state.stockInterval)
        Vibration.vibrate([500, 1000, 1000], true)
        setTimeout(() => {
          Vibration.cancel()
          this.setState({ date: 0 })
        }, 2000)
        this.props.navigation.navigate('Principal')
      }
    }, 1000)

    this.setState({ stockInterval: stock })
  }

  setDouble (e) {
    if (e < 10) {
      return '0' + e
    } else {
      return e
    }
  }

  secondToDate (e) {
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
      response = (this.setDouble(heure) + ':' + this.setDouble(minute) + ':' + this.setDouble(second))
    }

    return response
  }

  startNotification () {
    this.setState({
      date: 5 * 60 * 1000,
      stock: 5 * 60 * 1000
    })
    this.chrono()
  }

  componentDidMount () {
    this.startNotification()
  }

  componentWillUnmount () {
    clearInterval(this.state.stockInterval)
  }

  render () {
    const { color } = this.props
    const { date, stock } = this.state
    return (
      <View style={styles.body}>
        <View>
          {/* <Image source={check} style={styles.image}/> */}
          <View
            style={{
              borderWidth: 3,
              borderColor: this.state.date < (this.state.stock * 0.1) ? color.activeColor.secondary.dark : color.activeColor.secondary.dark,
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
                ...this.props.style,
                fontSize: 30,
                color: date < (stock * 0.1) ? 'red' : 'black'
              }}
            >{this.secondToDate(date)}
            </Text>
          </View>
          {/* <Text>vita ny</Text> */}
          {/* /!* <Text>{ navigation.state.params.lastTask }</Text> *!/ */}
          {/* <Text> Matory </Text> */}
          {/* <Text>Mianatra</Text> */}
          {/* <Text>Afaka</Text> */}
          {/* <Text style={{ ...this.props.style }}>{ this.secondToDate(this.state.date) }</Text> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd'
  },
  image: {
    width: 70,
    height: 70
  }
})

function mapStateToProps (state) {
  return { color: state.Color }
}

export default connect(
  mapStateToProps
)(Notification)
