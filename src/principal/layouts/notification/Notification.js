import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Text, Vibration } from 'react-native'
import check from './statics/images/check.png'

class Notification extends Component {
    constructor (props) {
        super(props)
        this.state = {
            date: 15 * 60 * 1000,
            stockInterval: null
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
            date: 1 * 60 * 1000
        })
        this.chrono()
    }

    componentDidMount () {
        console.log()
        this.startNotification()
    }

    componentWillUnmount () {
        clearInterval(this.state.stockInterval)
    }

    render () {
        const { navigation } = this.props
        return (
            <View style={styles.body}>
                <View>
                    <Image source={check} style={styles.image}/>
                    <Text>vita ny</Text>
                    <Text>{ navigation.state.params.lastTask }</Text>
                    <Text>Mianatra</Text>
                    <Text>Afaka</Text>
                    <Text style={{ ...this.props.style }}>{ this.secondToDate(this.state.date) }</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ddd'
    },
    image: {
        width: 70,
        height: 70
    }
})

function mapStateToProps (state) {
    return {}
}

export default connect(
    mapStateToProps
)(Notification)
